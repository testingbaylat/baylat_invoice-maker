'use client'

import { useEffect ,useMemo, useState } from 'react'

import { Building2, CalendarDays, ChevronDown, Download, FileText, Minus, Plus, Printer, RotateCcw, Trash2, X } from 'lucide-react'
import { baylatCompany, createEmptyItem, defaultDocument, type DocumentData } from '@/types/document'
import { documentTotal, formatCurrency, formatDate, itemAmount } from '@/utils/document'

const fieldLabels: Record<string, string> = { recipient: 'Recipient', company: 'Company', attention: 'Attention', memo: 'Memo / document title', accountName: 'Account name', accountNumber: 'Account number', bankName: 'Bank name' }

function InputField({ label, value, onChange, multiline = false, required = false }: { label: string; value: string; onChange: (value: string) => void; multiline?: boolean; required?: boolean }) {
  const Control = multiline ? 'textarea' : 'input'
  return <label className="field"><span>{label}{required && <b> *</b>}</span><Control value={value} onChange={(event) => onChange(event.target.value)} className={multiline ? 'field-control field-textarea' : 'field-control'} /></label>
}

function BaylatDocument({ data }: { data: DocumentData }) {
  const total = documentTotal(data)
  return <article className="baylat-document" id="baylat-print-document">
    <div className="watermark">
      <img src="/app_logo2.jpg" alt="baylat_logo" />
    </div>
    <header className="document-letterhead">
      <div className="logo-mark" aria-hidden="true">
        <img src="/logo.png" alt="Baylat Logo" />
      </div>
      <div className="brand-lockup"><strong>BAYLAT PROPERTIES</strong><em>{baylatCompany.slogan}</em></div>
      <div className="rc-number">{baylatCompany.rc}</div>
      <div className="green-rule" />
    
    </header>
    <section className="document-body">
      <p className="document-date">{formatDate(data.date)}.</p>
      <p className="recipient-block">To,<br /><strong>{data.recipient},</strong><br /><strong>{data.company}</strong><br /><span>ATTENTION: {data.attention}</span></p>
      <div className="memo-block"><strong>MEMO:</strong><p>{data.memo}</p></div>
      <table className="transaction-table"><thead><tr><th>No</th><th>Description of goods</th><th>Quantity</th><th>Price per Quantity tonnes</th><th>N      K</th></tr></thead><tbody>{data.items.map((item, index) => <tr key={item.id}><td>{index + 1}</td><td>{item.description || '—'}</td><td>{item.amount || 30} ({item.unit || '—'})</td><td>{formatCurrency(item.price)} X {item.quantity || 0}</td><td>{formatCurrency(itemAmount(item.quantity, item.price))}</td></tr>)}<tr className="total-row"><td colSpan={4}>GRANT TOTAL</td><td>{formatCurrency(total)}</td></tr></tbody></table>
      <section className="account-block"><p><b>ACCOUNT NAME:</b> {data.accountName}</p><p><b>ACCOUNT NUMBER:</b> {data.accountNumber}</p><p><b>BANK NAME:</b> {data.bankName}</p></section>
      <div className="signature">
      <img src="/sign.png" alt="signature" />  
      <div /><b>{baylatCompany.name}.</b></div>
    </section>
    <footer className="document-footer"><span>{baylatCompany.address}</span><span>{baylatCompany.website}  |  {baylatCompany.email}</span><span>{baylatCompany.phones}</span></footer>
  </article>
}

export default function DocumentGenerator() {
  const [data, setData] = useState<DocumentData>(defaultDocument)
  const [zoom, setZoom] = useState(100)
  const [errors, setErrors] = useState<string[]>([])
  const [tourStep, setTourStep] = useState(0)
  const [showTour, setShowTour] = useState(false)

  useEffect(() => {
  const completed = localStorage.getItem('baylat-tour-completed')

  if (!completed) {
    setShowTour(true)
  }
}, [])

  const total = useMemo(() => documentTotal(data), [data])
  const update = (key: keyof DocumentData, value: string) => setData((current) => ({ ...current, [key]: value }))
  const validate = () => { const required = ['recipient', 'company', 'memo', 'accountName', 'accountNumber', 'bankName']; const next = required.filter((key) => !String(data[key as keyof DocumentData]).trim()); if (!data.items.length) next.push('items'); if (data.items.some((item) => !item.description.trim() || item.quantity <= 0 || item.price <= 0)) next.push('item details'); setErrors(next); return next.length === 0 }
  const reset = () => { setData({ ...defaultDocument, items: defaultDocument.items.map((item) => ({ ...item })) }); setErrors([]) }
  
  const tourSteps = [
  {
    target: 'tour-document-info',
    title: 'Welcome to Baylat Document Generator !',
    text: 'This tool was created to make preparing transaction documents faster. Instead of manually editing the Word template for every transaction, enter the information here and your document is prepared automatically.',
  },
  {
    target: 'tour-document-info',
    title: '1. Document information',
    text: 'Start by entering the date, recipient, company and attention details. These values are automatically placed in the appropriate positions on the document.',
  },
  {
    target: 'tour-memo',
    title: 'Your document memo',
    text: 'Enter what the transaction document is about. This will appear in the MEMO section of the finished document.',
  },
  {
    target: 'tour-items',
    title: '2. Transaction items',
    text: 'Add every item involved in the transaction. Enter the description, quantity, unit and price. The application automatically calculates each line amount and the grand total.',
  },
  {
    target: 'tour-account',
    title: '3. Account information',
    text: 'Enter the account details that should appear on the completed document.',
  },
  {
    target: 'tour-preview',
    title: 'Review your document',
    text: 'Your document updates as you type. Use this A4 preview to check the information and layout before printing.',
  },
  {
    target: 'tour-print',
    title: 'Ready to go 🖨️',
    text: 'Once everything looks correct, click Print. From the browser print dialog you can print the document or choose Save as PDF.',
  },
  {
    target: 'tour-new',
    title: 'Finished? Start another one.',
    text: 'When you are done with a transaction, use New doc to clear the current information and prepare the next document.',
  },
]

const finishTour = () => {
  localStorage.setItem('baylat-tour-completed', 'true')
  setShowTour(false)
  setTourStep(0)
}

const nextTourStep = () => {
  if (tourStep === tourSteps.length - 1) {
    finishTour()
  } else {
    setTourStep((step) => step + 1)
  }
}

const previousTourStep = () => {
  setTourStep((step) => Math.max(0, step - 1))
}

const restartTour = () => {
  setTourStep(0)
  setShowTour(true)
}
  
  
  return <main className="generator-shell">
    <header className="app-header"><div className="app-brand">
      <div className="app-icon">
    <img src={"/logo.png"} />  
    </div>
    <div><h1>Baylat Invoice Generator</h1><p>Internal Document Automation</p></div></div><button className="button button-outline"  id="tour-new" onClick={reset}><RotateCcw size={15} /> New doc</button></header>
    <div className="workspace">
      <aside className="form-panel"><div className="panel-intro"><div><h2>Document details</h2></div></div>
      <section className="form-section"  id="tour-document-info" ><div className="section-heading"><CalendarDays size={16} /><span>Document information</span></div><div className="form-grid"><label className="field"><span>Date</span><input type="date" value={data.date} onChange={(e) => update('date', e.target.value)} className="field-control" /></label><InputField label={fieldLabels.recipient} required value={data.recipient} onChange={(v) => update('recipient', v)} /><InputField label={fieldLabels.company} required value={data.company} onChange={(v) => update('company', v)} /><InputField label={fieldLabels.attention} value={data.attention} onChange={(v) => update('attention', v)} /><div className="field field-wide" id="tour-memo"><InputField label={fieldLabels.memo} required multiline value={data.memo} onChange={(v) => update('memo', v)} /></div></div></section>
      <section className="form-section" id="tour-items"><div className="section-heading"><span>Transaction items</span><span className="section-total">₦{formatCurrency(total)}</span></div><div className="items-list">{data.items.map((item, index) => <div className="item-editor" key={item.id}><div className="item-topline"><span>Item {String(index + 1).padStart(2, '0')}</span><button className="icon-button danger" aria-label={`Remove item ${index + 1}`} onClick={() => setData((current) => ({ ...current, items: current.items.filter((row) => row.id !== item.id) }))}><Trash2 size={14} /></button></div><div className="item-grid"><label className="field item-description"><span>Description *</span><input className="field-control" value={item.description} onChange={(e) => setData((current) => ({ ...current, items: current.items.map((row) => row.id === item.id ? { ...row, description: e.target.value } : row) }))} /></label><label className="field"><span>Quantity*</span><input type="number" min="0" className="field-control" value={item.quantity} onChange={(e) => setData((current) => ({ ...current, items: current.items.map((row) => row.id === item.id ? { ...row, quantity: Number(e.target.value) } : row) }))} /></label><label className="field"><span>Unit</span><input className="field-control" value={item.unit} onChange={(e) => setData((current) => ({ ...current, items: current.items.map((row) => row.id === item.id ? { ...row, unit: e.target.value } : row) }))} /></label><label className="field"><span>Price *</span><input type="number" min="0" className="field-control" value={item.price} onChange={(e) => setData((current) => ({ ...current, items: current.items.map((row) => row.id === item.id ? { ...row, price: Number(e.target.value) } : row) }))} /></label></div><div className="item-amount">Line amount <strong>₦{formatCurrency(itemAmount(item.quantity, item.price))}</strong></div></div>)}</div><button className="add-item" onClick={() => setData((current) => ({ ...current, items: [...current.items, createEmptyItem()] }))}><Plus size={15} /> Add item</button></section><section className="form-section" id="tour-account"><div className="section-heading"><Building2 size={16} /><span>Account information</span></div><div className="form-grid"><InputField label={fieldLabels.accountName} required value={data.accountName} onChange={(v) => update('accountName', v)} /><InputField label={fieldLabels.accountNumber} required value={data.accountNumber} onChange={(v) => update('accountNumber', v)} /><InputField label={fieldLabels.bankName} required value={data.bankName} onChange={(v) => update('bankName', v)} /></div></section>
      {errors.length > 0 && <p className="error-message">Please complete the required fields: {errors.map((error) => error === 'items' ? 'at least one item' : error).join(', ')}.</p>}<div className="form-actions"><span id='info'>click on print button to get the pdf document*</span>
      {/* <button className="button button-ghost" onClick={reset}><X size={15} /> Clear</button> */}
      {/* <button className="button button-primary" onClick={validate}><Download size={15} /> Generate PDF</button> */}
      </div>
    </aside>
    <section className="preview-panel" id="tour-preview"><div className="preview-toolbar"><div><span className="eyebrow">LIVE OUTPUT</span><h2>A4 document preview</h2></div><div className="toolbar-actions">
      {/* <button className="icon-button" aria-label="Zoom out" onClick={() => setZoom((v) => Math.max(40, v - 5))}><Minus size={15} />
      </button> */}
      {/* <button className="zoom-label" onClick={() => setZoom(66)}>{zoom}%</button><button className="icon-button" aria-label="Zoom in" onClick={() => setZoom((v) => Math.min(100, v + 5))}><Plus size={15} /></button> */}
    <button id="tour-print" className="m_button button button-outline print-button" onClick={() => window.print()}><Printer size={15} /> Print</button></div>
    </div>
    <div className="preview-stage"><div className="paper-wrap" style={{ width: `${zoom}%` }}><BaylatDocument data={data} /></div></div></section></div>
      {showTour && (
          <div className="tour-overlay">
            <div className="tour-backdrop" />

            <div className="tour-card">
              <div className="tour-progress">
                <span>
                  {tourStep + 1} of {tourSteps.length}
                </span>

                <button
                  className="tour-skip"
                  onClick={finishTour}
                >
                  Skip
                </button>
              </div>

              <h3>{tourSteps[tourStep].title}</h3>

              <p>{tourSteps[tourStep].text}</p>

              <div className="tour-actions">
                {tourStep > 0 ? (
                  <button
                    className="tour-back"
                    onClick={previousTourStep}
                  >
                    Back
                  </button>
                ) : (
                  <span />
                )}

                <button
                  className="tour-next"
                  onClick={nextTourStep}
                >
                  {tourStep === tourSteps.length - 1 ? 'Finish' : 'Next'}
                </button>
              </div>
            </div>
          </div>
        )}
          
  
  </main>
}
