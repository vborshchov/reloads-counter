const filterManager = {
    filterByDateRange: (data, {from, to}) => {
        return data.filter(item => {
            const itemDate = item.createdAt || item.navigationStart
            if (itemDate) {
                return from <= itemDate && itemDate <= to
            }
            return false; 
        })
    }
}

export default filterManager;