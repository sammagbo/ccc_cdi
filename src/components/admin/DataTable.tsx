import { useState, useMemo } from 'react'
import { Search, Edit, Trash2, ChevronLeft, ChevronRight } from 'lucide-react'

// Generic Column Definition
export interface ColumnDef<T> {
  header: string
  accessorKey: keyof T
  cell?: (item: T) => React.ReactNode
}

interface DataTableProps<T> {
  data: T[]
  columns: ColumnDef<T>[]
  onEdit?: (item: T) => void
  onDelete?: (item: T) => void
  searchKey: keyof T // Which field to search on
}

export function DataTable<T>({ data, columns, onEdit, onDelete, searchKey }: DataTableProps<T>) {
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Filter Data
  const filteredData = useMemo(() => {
    if (!search.trim()) return data
    return data.filter((item) => {
      const val = item[searchKey]
      return String(val).toLowerCase().includes(search.toLowerCase())
    })
  }, [data, search, searchKey])

  // Pagination Logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    return filteredData.slice(start, start + itemsPerPage)
  }, [filteredData, currentPage])

  // Reset page when search changes
  useMemo(() => setCurrentPage(1), [search])

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-notebook-lines overflow-hidden flex flex-col">
      {/* Table Toolbar */}
      <div className="p-4 border-b border-notebook-lines flex items-center justify-between bg-notebook-beige/30">
        <div className="relative w-full max-w-sm flex items-center">
          <Search className="absolute left-3 w-4 h-4 text-notebook-pencil/40" />
          <input
            type="text"
            placeholder="Procurar..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-notebook-lines rounded-lg text-sm bg-white focus:outline-none focus:border-blue-300 transition-colors"
          />
        </div>
        <div className="text-sm font-medium text-notebook-pencil/60">
          <strong className="text-blue-900 font-black">{filteredData.length}</strong> itens
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-notebook-lines text-xs font-black uppercase tracking-wider text-notebook-pencil/60">
              {columns.map((col, idx) => (
                <th key={idx} className="px-6 py-4">{col.header}</th>
              ))}
              {(onEdit || onDelete) && <th className="px-6 py-4 text-right">Ações</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-notebook-lines/30">
            {paginatedData.length > 0 ? (
              paginatedData.map((item, idx) => (
                <tr key={idx} className="hover:bg-blue-50/50 transition-colors">
                  {columns.map((col, colIdx) => (
                    <td key={colIdx} className="px-6 py-4 text-sm text-blue-950 font-medium whitespace-nowrap">
                      {col.cell ? col.cell(item) : String(item[col.accessorKey] || '')}
                    </td>
                  ))}
                  {(onEdit || onDelete) && (
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {onEdit && (
                          <button onClick={() => onEdit(item)} className="p-1.5 text-blue-600 hover:bg-blue-100 rounded-md transition-colors" title="Editar">
                            <Edit className="w-4 h-4" />
                          </button>
                        )}
                        {onDelete && (
                          <button onClick={() => onDelete(item)} className="p-1.5 text-rose-600 hover:bg-rose-100 rounded-md transition-colors" title="Apagar">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + 1} className="px-6 py-12 text-center text-notebook-pencil/50 text-sm">
                  Nenhum resultado encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="p-4 border-t border-notebook-lines flex items-center justify-between bg-slate-50/50">
          <span className="text-sm text-notebook-pencil/60">
            Página <strong className="text-blue-900">{currentPage}</strong> de {totalPages}
          </span>
          <div className="flex items-center gap-2">
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => p - 1)}
              className="p-1.5 border border-notebook-lines rounded hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-blue-900 bg-notebook-beige"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button 
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => p + 1)}
              className="p-1.5 border border-notebook-lines rounded hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-blue-900 bg-notebook-beige"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
