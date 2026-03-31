import { useState } from 'react'
import { Plus } from 'lucide-react'
import { useAppStore } from '../../store/useAppStore'
import { CatalogBook, categories } from '../../services/catalogData'
import { DataTable, ColumnDef } from '../../components/admin/DataTable'
import { ItemFormModal, FormField } from '../../components/admin/ItemFormModal'

export default function CatalogManager() {
  const books = useAppStore(state => state.books)
  const addBook = useAppStore(state => state.addBook)
  const updateBook = useAppStore(state => state.updateBook)
  const deleteBook = useAppStore(state => state.deleteBook)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingBook, setEditingBook] = useState<CatalogBook | null>(null)

  // Definir Estrutura da Tabela (Columns)
  const columns: ColumnDef<CatalogBook>[] = [
    {
      header: 'Título',
      accessorKey: 'title',
      cell: (item) => (
        <div className="flex flex-col">
          <span className="font-bold font-serif text-blue-950 truncate max-w-[200px]" title={item.title}>{item.title}</span>
          <span className="text-[10px] text-notebook-pencil uppercase tracking-widest">{item.author}</span>
        </div>
      )
    },
    {
      header: 'Categoria',
      accessorKey: 'category',
      cell: (item) => (
        <span className="bg-slate-100 px-2 py-1 rounded text-xs font-bold text-slate-700">{item.category}</span>
      )
    },
    {
      header: 'Tipo',
      accessorKey: 'type',
      cell: (item) => (
        <span className={`px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest ${
          item.type === 'PDF' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
        }`}>
          {item.type}
        </span>
      )
    },
    {
      header: 'Disponível',
      accessorKey: 'available',
      cell: (item) => (
        <div className="flex items-center">
          {item.available ? (
             <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]" title="Disponível"></span>
          ) : (
             <span className="w-2.5 h-2.5 bg-rose-500 rounded-full shadow-[0_0_8px_rgba(244,63,94,0.5)]" title="Indisponível"></span>
          )}
        </div>
      )
    }
  ]

  // Definir Campos do Formulário Dinâmico
  const formFields: FormField[] = [
    { name: 'title', label: 'Título do Livro', type: 'text', required: true, placeholder: 'Ex: 1984' },
    { name: 'author', label: 'Autor', type: 'text', required: true, placeholder: 'Ex: George Orwell' },
    { name: 'category', label: 'Categoria', type: 'select', required: true, options: categories.map(c => ({ label: c, value: c })) },
    { 
      name: 'type', 
      label: 'Formato', 
      type: 'select', 
      required: true,
      options: [
        { label: 'Físico (Physique)', value: 'Physique' },
        { label: 'Digital (PDF)', value: 'PDF' },
        { label: 'Bibliografia (Recomendação)', value: 'Bibliographie' }
      ]
    },
    {
      name: 'levels',
      label: 'Níveis de Escolaridade',
      type: 'multiselect',
      required: true,
      options: [
        { label: 'Collège', value: 'college' },
        { label: 'Lycée', value: 'lycee' }
      ]
    },
    { name: 'coverUrl', label: 'URL da Capa (Opcional)', type: 'text', required: false, placeholder: 'https://exemplo.com/capa.jpg' },
    { name: 'synopsis', label: 'Sinopse', type: 'textarea', required: false, placeholder: 'Breve descrição do livro...' },
    { name: 'available', label: 'Disponível na Prateleira?', type: 'checkbox', placeholder: 'Sim, está disponível' }
  ]

  // Handlers
  const handleAddNew = () => {
    setEditingBook(null)
    setIsModalOpen(true)
  }

  const handleEdit = (book: CatalogBook) => {
    setEditingBook(book)
    setIsModalOpen(true)
  }

  const handleDelete = (book: CatalogBook) => {
    if (window.confirm(`Tens a certeza que queres eliminar "${book.title}"?`)) {
      deleteBook(book.id)
    }
  }

  const handleFormSubmit = (data: any) => {
    if (editingBook) {
      // Update
      updateBook(editingBook.id, data)
    } else {
      // Create - Generate ID
      const newBook: CatalogBook = {
        ...data,
        id: `bk-${Date.now()}`
      }
      addBook(newBook)
    }
    setIsModalOpen(false)
  }

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-8 animate-fade-in-up pb-10">
      
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 bg-white p-6 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-notebook-lines relative overflow-hidden">
        {/* Decorative corner */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-bl-full pointer-events-none"></div>

        <div className="relative z-10">
          <h1 className="text-3xl font-serif font-bold text-blue-900 leading-tight">Gestão do Catálogo</h1>
          <p className="text-notebook-pencil/70 font-medium">
            Adiciona, edita ou remove livros do acervo do CDI.
          </p>
        </div>
        <button 
          onClick={handleAddNew}
          className="relative z-10 bg-blue-900 hover:bg-blue-950 text-white font-bold text-xs tracking-widest uppercase px-6 py-3 rounded-lg transition-colors flex items-center gap-2 shadow-sm"
        >
          <Plus className="w-4 h-4" /> Adicionar Livro
        </button>
      </div>

      {/* Main Table Area */}
      <DataTable 
        data={books}
        columns={columns}
        searchKey="title"
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Modal Genérico */}
      <ItemFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
        title={editingBook ? 'Editar Livro' : 'Novo Livro'}
        fields={formFields}
        initialData={editingBook}
      />

    </div>
  )
}
