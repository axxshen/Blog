import { ExtendedRecordMap, SearchParams, SearchResults } from 'notion-types'
import { mergeRecordMaps } from 'notion-utils'
import pMap from 'p-map'
import pMemoize from 'p-memoize'

import {
  isPreviewImageSupportEnabled,
  navigationLinks,
  navigationStyle
} from './config'
import { notion } from './notion-api'
import { getPreviewImageMap } from './preview-images'

const getNavigationLinkPages = pMemoize(
  async (): Promise<ExtendedRecordMap[]> => {
    try {
      const navigationLinkPageIds = (navigationLinks || [])
        .map((link) => link.pageId)
        .filter(Boolean)

      if (navigationStyle !== 'default' && navigationLinkPageIds.length) {
        return pMap(
          navigationLinkPageIds,
          async (navigationLinkPageId) => {
            try {
              return await notion.getPage(navigationLinkPageId, {
                chunkLimit: 1,
                fetchMissingBlocks: false,
                fetchCollections: false,
                signFileUrls: false
              })
            } catch (error) {
              console.error(`Error fetching navigation link page ${navigationLinkPageId}:`, error)
              return null
            }
          },
          {
            concurrency: 4
          }
        ).then(results => results.filter(Boolean))
      }

      return []
    } catch (error) {
      console.error('Error getting navigation link pages:', error)
      return []
    }
  }
)

export async function getPage(pageId: string): Promise<ExtendedRecordMap> {
  try {
    let recordMap = await notion.getPage(pageId)

    if (navigationStyle !== 'default') {
      // ensure that any pages linked to in the custom navigation header have
      // their block info fully resolved in the page record map so we know
      // the page title, slug, etc.
      const navigationLinkRecordMaps = await getNavigationLinkPages()

      if (navigationLinkRecordMaps?.length) {
        recordMap = navigationLinkRecordMaps.reduce(
          (map, navigationLinkRecordMap) =>
            mergeRecordMaps(map, navigationLinkRecordMap),
          recordMap
        )
      }
    }

    if (isPreviewImageSupportEnabled) {
      const previewImageMap = await getPreviewImageMap(recordMap)
      ;(recordMap as any).preview_images = previewImageMap
    }

    return recordMap
  } catch (error) {
    console.error('Error fetching Notion page:', error)
    // Return a basic recordMap structure to prevent complete failure
    return {
      block: {},
      collection: {},
      collection_view: {},
      notion_user: {},
      signed_urls: {}
    } as ExtendedRecordMap
  }
}

export async function search(params: SearchParams): Promise<SearchResults> {
  return notion.search(params)
}
