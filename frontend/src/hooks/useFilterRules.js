import { useDismiss, useFloating, useInteractions } from "@floating-ui/react"
import { useMemo, useState } from "react"

//example data
const FILTER_PROPERTIES = {
  type: ['income', 'expense'],
  category: {
    income: ['salary', 'freelance'],
    expense: [
      'food',
      'transport',
      'entertainment',
      'housing',
      'health',
      'education',
      'utilities',
      'shopping',
      'travel',
      'gifts',
      'cafe',
    ],
  },
}

const useFilterRules = (transactions, openMenu, setOpenMenu, toggleMenu) => {
    const [filterRules, setFilterRules] = useState({
        type: [],
        category: [], 
        source: []
    })

    const availableTypes = FILTER_PROPERTIES.type
    const availableSources = FILTER_PROPERTIES.source
    const availableCategories = [...new Set(filterRules.type.length === 0 
        ? Object.values(FILTER_PROPERTIES.category).flat() 
        : filterRules.type.flatMap(type => FILTER_PROPERTIES.category[type]))]

    const optionsByFilter = {
        type: availableTypes,
        category: availableCategories,
        source: availableSources,
    }

    const [activeFilters, setActiveFilters] = useState([])
    const availableFilters = Object.keys(FILTER_PROPERTIES).filter(prop => !activeFilters.includes(prop))

    const filteredTransactions = useMemo(() => filterTransactions(), [transactions, filterRules])

    function toggleFilterOption(filter, option) {
        setFilterRules(prev => ({
            ...prev,
            [filter]: prev[filter].includes(option) ? 
            [...prev[filter].filter(item => item !== option)] :
            [...prev[filter], option]
        }))
    }

    function addActiveFilter(filter) {
        setActiveFilters(prev => [...prev, filter])
        toggleMenu(null)
    }

    function filterTransactions() {
        let updatedTransactions = [...transactions]
        for (const [rule, options] of Object.entries(filterRules)) {
            updatedTransactions = updatedTransactions.filter(tran => options.length > 0 ? options.includes(tran[rule]) : true)
        }
        return updatedTransactions
    }
    
    //Floating UI
    const {refs, floatingStyles, context} = useFloating({
        open: openMenu === 'filter',
        onOpenChange: open => setOpenMenu(open ? 'filter' : null),
        placement: 'bottom-start'
    })

    const dismiss = useDismiss(context)
    const {getReferenceProps, getFloatingProps} = useInteractions([dismiss])

    return {
        activeFilters,
        availableFilters,
        optionsByFilter,
        filterRules,
        filteredTransactions,

        toggleFilterOption,
        addActiveFilter,

        filterRefs: refs,
        filterFloatingStyles: floatingStyles,
        getFilterReferenceProps: getReferenceProps,
        getFilterFloatingProps: getFloatingProps,
    }
}


export default useFilterRules
