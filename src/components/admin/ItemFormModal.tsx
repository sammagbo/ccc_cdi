import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

export type FieldType = 'text' | 'textarea' | 'select' | 'multiselect' | 'checkbox'

export interface FormField {
  name: string
  label: string
  type: FieldType
  options?: { label: string, value: string }[] // For select and multiselect
  required?: boolean
  placeholder?: string
}

interface ItemFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: any) => void
  title: string
  fields: FormField[]
  initialData?: any
}

export function ItemFormModal({ isOpen, onClose, onSubmit, title, fields, initialData }: ItemFormModalProps) {
  const [formData, setFormData] = useState<any>({})

  // Initialize form when modal opens
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData(initialData)
      } else {
        // Init with empty
        const empty: any = {}
        fields.forEach(f => {
          if (f.type === 'multiselect') empty[f.name] = []
          else if (f.type === 'checkbox') empty[f.name] = true // Assume defaults to true for things like 'available' if boolean
          else empty[f.name] = ''
        })
        setFormData(empty)
      }
    }
  }, [isOpen, initialData, fields])

  if (!isOpen) return null

  const handleChange = (name: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [name]: value }))
  }

  const handleMultiSelect = (name: string, value: string) => {
    const current = Array.isArray(formData[name]) ? formData[name] : []
    if (current.includes(value)) {
      handleChange(name, current.filter((v: string) => v !== value))
    } else {
      handleChange(name, [...current, value])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-blue-950/40 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-fade-in-up relative z-10 border border-notebook-lines">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-notebook-lines flex items-center justify-between bg-notebook-beige/40">
          <h3 className="text-xl font-bold font-serif text-blue-950">{title}</h3>
          <button onClick={onClose} className="p-1 text-notebook-pencil/50 hover:text-rose-500 hover:bg-rose-50 rounded transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 bg-[#fdfaf3]">
          <form id="dynamic-form" onSubmit={handleSubmit} className="space-y-6">
            {fields.map(field => (
              <div key={field.name} className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-blue-950 uppercase tracking-wider text-[10px]">
                  {field.label} {field.required && <span className="text-rose-500">*</span>}
                </label>
                
                {field.type === 'text' && (
                  <input
                    type="text"
                    required={field.required}
                    placeholder={field.placeholder}
                    value={formData[field.name] || ''}
                    onChange={e => handleChange(field.name, e.target.value)}
                    className="border-2 border-notebook-lines rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-colors"
                  />
                )}
                
                {field.type === 'textarea' && (
                  <textarea
                    required={field.required}
                    placeholder={field.placeholder}
                    rows={4}
                    value={formData[field.name] || ''}
                    onChange={e => handleChange(field.name, e.target.value)}
                    className="border-2 border-notebook-lines rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 resize-none transition-colors"
                  />
                )}

                {field.type === 'select' && field.options && (
                  <select
                    required={field.required}
                    value={formData[field.name] || ''}
                    onChange={e => handleChange(field.name, e.target.value)}
                    className="border-2 border-notebook-lines rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:border-blue-400 transition-colors cursor-pointer"
                  >
                    <option value="" disabled>Selecione...</option>
                    {field.options.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                )}

                {field.type === 'multiselect' && field.options && (
                  <div className="flex flex-wrap gap-2">
                    {field.options.map(opt => {
                      const isSelected = Array.isArray(formData[field.name]) && formData[field.name].includes(opt.value)
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => handleMultiSelect(field.name, opt.value)}
                          className={`px-3 py-1.5 border-2 rounded-md text-xs font-bold uppercase tracking-wider transition-colors ${
                            isSelected 
                              ? 'bg-blue-100 border-blue-400 text-blue-900 shadow-sm' 
                              : 'bg-white border-notebook-lines text-notebook-pencil hover:bg-slate-50'
                          }`}
                        >
                          {opt.label}
                        </button>
                      )
                    })}
                  </div>
                )}
                
                {field.type === 'checkbox' && (
                  <label className="flex items-center gap-3 cursor-pointer mt-1 w-fit group">
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                      formData[field.name] ? 'bg-blue-600 border-blue-600' : 'bg-white border-notebook-lines group-hover:border-blue-400'
                    }`}>
                      {formData[field.name] && <span className="text-white text-xs font-bold">✓</span>}
                    </div>
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={!!formData[field.name]}
                      onChange={e => handleChange(field.name, e.target.checked)}
                    />
                    <span className="text-sm font-bold text-blue-900">{field.placeholder || field.label}</span>
                  </label>
                )}
              </div>
            ))}
          </form>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-notebook-lines bg-notebook-beige/40 flex justify-end gap-3 rounded-b-2xl">
          <button 
            type="button" 
            onClick={onClose}
            className="px-4 py-2 text-sm font-bold text-notebook-pencil/70 hover:text-blue-950 transition-colors uppercase tracking-widest"
          >
            Cancelar
          </button>
          <button 
            type="submit" 
            form="dynamic-form"
            className="px-6 py-2 bg-blue-900 text-white text-xs tracking-widest uppercase font-bold rounded-lg hover:bg-black transition-colors shadow-md"
          >
            Guardar Item
          </button>
        </div>

      </div>
    </div>
  )
}
