const filterData = <T extends Record<string, unknown>, K extends Partial<T>>(data: T[], filters: K): T[] => {
    if(!Object.keys(filters).length) return data

    const filteredData = data.filter((item): item is T => {
        const resultFilterItem: boolean[] = []

        Object.keys(filters).forEach(key => resultFilterItem.push(item[key] === filters[key]))

        return !resultFilterItem.includes(false);
    })
    
    return filteredData
}

export { filterData }