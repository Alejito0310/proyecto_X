import React, { useEffect, useState } from 'react'
import { supabase } from '../../supabase'

function useCounter(table, column, value) {
    const [count, setCount] = useState(0)

    useEffect(() => {
        if (!value) return;
        const fetchCounts = async () => {
            const {count: total, error} = await supabase.from(table)
            .select('*', {count: 'exact', head: true})
            .eq(column, value)

            if (!error) {
            setCount(total || 0)
            }
        }
        fetchCounts()
    }, [table, column, value])
  return {count, setCount}
}

export default useCounter
