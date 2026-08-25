import { move } from "@dnd-kit/helpers"
import { useDismiss, useFloating, useInteractions } from "@floating-ui/react"
import { useMemo, useState } from "react"

const SORT_PROPERTIES = ['date', 'amount']

const useSortRules = (transactions, openMenu, setOpenMenu, toggleMenu) => {
    const [sortRules, setSortRules] = useState([{id: 0, field: 'date', direction: 'desc'}]) //default setting

    const sortedTransactions = useMemo(() => sortTransactions(), [sortRules, transactions])

    const availableSortProperties = SORT_PROPERTIES.filter(prop => !sortRules.some(rule => rule.field === prop))

    function toggleDirection(field) {
    setSortRules(prev => prev.map(rule =>
        rule.field === field ? {
            ...rule, direction: rule.direction === 'asc' ? 'desc' : 'asc'
        } : rule
    ))
    }
    function addSortRule(property) {
        setSortRules(prev => [
            ...prev,
            {id: sortRules.length, field: property, direction: 'asc'}
        ])
        toggleMenu('sort')
    }
    function deleteSortRule(field) {
        setSortRules(prev => prev.filter(rule => rule.field !== field))
    }

    function sortTransactions() {
        let updatedTransactions = [...transactions]
        for (let i = sortRules.length-1; i >= 0; i--) {
            const field = sortRules[i].field
            const direction = sortRules[i].direction

            updatedTransactions.sort((a,b) => compareValues(a[field], b[field], direction))
        }
        return updatedTransactions
    }

    function compareValues(a, b, direction) {
        let result
        if (typeof a === 'number' && typeof b === 'number') {
            result = a - b
        }
        else result = a.localeCompare(b) //for dates

        return direction === 'desc' ? -result : result
    }

    //Drag & Drop
    const handleDragEnd = (event) => {
        if (event.canceled) return
        setSortRules(rules => move(rules, event))
    }

    //Floating UI
    const {refs, floatingStyles, context } = useFloating({
        open: openMenu === 'sort',
        onOpenChange: open => setOpenMenu(open ? 'sort' : null),
        placement: 'bottom-start'
    })

    const dismiss = useDismiss(context)
    const {getReferenceProps, getFloatingProps} = useInteractions([dismiss])

    return {
        sortedTransactions,
        sortRules,
        availableSortProperties,
        sortFloatingStyles: floatingStyles,
        sortRefs: refs,
        getSortReferenceProps: getReferenceProps,
        getSortFloatingProps: getFloatingProps,
        handleDragEnd,
        toggleDirection,
        addSortRule,
        deleteSortRule

    }

}

export default useSortRules
