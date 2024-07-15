import { filterData } from "../data/filters/filtersData"


// find all filters handler
export async function getFilters() {
    try {
        return filterData
    } catch (e) {
        throw e
    }
}

// create a filter handler
export async function createFilter(reqQuery: any) {
    try {
        return true
    } catch (e) {
        throw e
    }
}