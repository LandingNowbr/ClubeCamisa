import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowDown, ArrowRight, Check, ChevronDown, CircleHelp, Menu, ShieldCheck, Shirt, Sparkles, X, Zap } from 'lucide-react'
import './styles.css'

const plans = [
  {
    id: 'arquibancada',
    name: 'Arquibancada',
    subtitle: 'Pra começar a coleção',
    quantity: '1 camisa surpresa',
    price: '79,90',
    tag: '',
    features: ['1 camisa de futebol por mês', 'Times nacionais ou internacionais', 'Curadoria surpresa', 'Frete calculado na finalização'],
    color: 'white'
  },
  {
    id: 'titular',
    name: 'Time titular',
    subtitle: 'A escolha da torcida',
    quantity: '2 camisas surpresa',
    price: '139,90',
    tag: 'MAIS ESCOLHIDO',
    features: ['2 camisas de futebol por mês', 'Mais variedade na coleção', 'Times nacionais ou internacionais', 'Frete calculado na finalização'],
    color: 'green'
  },
  {
    id: 'lenda',
    name: 'Lenda',
    subtitle: 'Pra quem vive futebol',
    quantity: '3 camisas surpresa',
    price: '189,90',
    tag: 'MÁXIMA SURPRESA',
    features: ['3 camisas de futebol por mês', 'Aumente sua coleção mais rápido', 'Times nacionais ou internacionais', 'Frete calculado na finalização'],
    color: 'dark'
  }
]

const faqs = [
  ['Como funciona a surpresa?', 'Você escolhe um plano e recebe mensalmente a quantidade de camisas correspondente. Os modelos e times são surpresa — é parte da experiência do clube.'],
  ['Posso escolher o time?', 'Neste protótipo, a proposta é receber camisas sortidas. Preferências de times, tamanhos e restrições podem ser coletadas no cadastro da assinatura, conforme a operação definir.'],
  ['As camisas são originais?', 'A política de autenticidade e procedência precisa ser definida pelo responsável pelo clube antes da abertura das vendas. Esta demonstração não promete autenticidade ou categorias específicas de produto.'],
  ['Posso cancelar?', 'A experiência final deverá permitir o cancelamento conforme as regras comerciais do clube. No protótipo, a assinatura é apenas demonstrativa e não gera cobrança.']
]

function Jersey({ variant = 0, small = false }) {
  const colors = [
    ['#f2f0e8', '#181b19', '#d6d5cb'],
    ['#171b20', '#f4f1e7', '#313a42'],
    ['#c8a77b', '#22251f', '#a7865c']
  ]
  const c = colors[variant % colors.length]
  return (
    <svg className={`jersey ${small ? 'jersey-small' : ''}`} viewBox="0 0 220 220" role="img" aria-label="Ilustração de camisa de futebol">
      <defs>
        <linearGradient id={`fabric-${variant}`} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor={c[0]} />
          <stop offset="1" stopColor={c[2]} />
        </linearGradient>
      </defs>
      <path d="M68 28 91 17 Q110 33 129 17 L152 28 201 62 178 102 157 88 157 194 63 194 63 88 42 102 19 62Z" fill={`url(#fabric-${variant})`} stroke={c[1]} strokeWidth="5" strokeLinejoin="round"/>
      <path d="M91 18 Q110 48 129 18" fill="none" stroke={c[1]} strokeWidth="8"/>
      <path d="M63 87 42 102 30 82 M157 87 178 102 190 82" fill="none" stroke={c[1]} strokeWidth="5"/>
      <path d="M110 49 V190" stroke={c[1]} strokeWidth="2" opacity=".12"/>
      <path d="M77 59 H143" stroke={c[1]} strokeWidth="3" opacity=".35"/>
      <path d="M81 75 H139" stroke={c[1]} strokeWidth="2" opacity=".2"/>
      <path d="M93 101 110 91 127 101 124 122 110 130 96 122Z" fill="none" stroke={c[1]} strokeWidth="3" opacity=".7"/>
      <circle cx="110" cy="111" r="4" fill={c[1]} opacity=".7"/>
    </svg>
  )
}

function App() {
  const [selected, setSelected] = useState('titular')
  const [modal, setModal] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState(0)
  const currentPlan = plans.find(p => p.id === selected)

  const startSubscription = (id) => {
    setSelected(id)
    setModal(true)
  }

  return (
    <div className="site-shell">
      <div className="announcement"><span className="pulse-dot" /> TODO MÊS, UMA NOVA SURPRESA <span className="announcement-line" /> EDIÇÃO DE NOVEMBRO DISPONÍVEL</div>
      <header className="header">
        <a href="#inicio" className="brand" aria-label="Clube Camisa Surpresa - início">
          <img src="./logo-clube-camisa.png" alt="Clube Camisa Surpresa" />
          <span>CLUBE <b>CAMISA</b></span>
        </a>
        <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menu">{menuOpen ? <X/> : <Menu/>}</button>
        <nav className={menuOpen ? 'nav nav-open' : 'nav'}>
          <a href="#como-funciona" onClick={() => setMenuOpen(false)}>Como funciona</a>
          <a href="#planos" onClick={() => setMenuOpen(false)}>Planos</a>
          <a href="#duvidas" onClick={() => setMenuOpen(false)}>Dúvidas</a>
          <a href="#planos" className="nav-cta" onClick={() => setMenuOpen(false)}>Quero assinar <ArrowRight size={15}/></a>
        </nav>
      </header>

      <main>
        <section className="hero" id="inicio">
          <div className="hero-copy">
            <div className="eyebrow"><span>01</span> O FUTEBOL NÃO TEM ROTINA. SUA COLEÇÃO TAMBÉM NÃO.</div>
            <h1>SUA PRÓXIMA<br/>CAMISA É <em>SEGREDO.</em></h1>
            <p className="hero-lead">Uma camisa diferente. Uma história nova. Todo mês, a emoção de abrir a caixa sem saber qual vai ser a próxima.</p>
            <div className="hero-actions">
              <a href="#planos" className="button button-green">ESCOLHER MEU PLANO <ArrowRight size={17}/></a>
              <a href="#como-funciona" className="text-link">ENTENDA A SURPRESA <ArrowDown size={15}/></a>
            </div>
            <div className="hero-proof">
              <div className="proof-icon"><Shirt size={18}/></div>
              <div><strong>FUTEBOL NA SUA PORTA</strong><span>Uma experiência nova a cada mês</span></div>
            </div>
          </div>
          <div className="hero-art">
            <div className="art-stamp">DROP<br/><b>001</b></div>
            <div className="art-ring"></div>
            <div className="shirt-stage">
              <div className="stage-glow"></div>
              <Jersey variant={1}/>
              <div className="mystery-card"><span>?</span><small>QUAL SERÁ A SUA?</small></div>
            </div>
            <div className="art-caption"><span>CAMISA Nº 001</span><span>IDENTIDADE EM CAMPO</span></div>
            <div className="art-side-note">NÃO É SÓ UMA CAMISA.<br/>É A PRÓXIMA HISTÓRIA.</div>
          </div>
          <div className="hero-bottom"><span>01 / 03</span><span>DESLIZE PARA DESCOBRIR</span><span className="scroll-line"></span></div>
        </section>

        <section className="ticker" aria-label="Destaques"><div>CAMISAS <b>•</b> FUTEBOL <b>•</b> SURPRESA <b>•</b> COLEÇÃO <b>•</b> CAMISAS <b>•</b> FUTEBOL <b>•</b> SURPRESA <b>•</b> COLEÇÃO <b>•</b></div></section>

        <section className="how section-wrap" id="como-funciona">
          <div className="section-kicker"><span>02</span> SIMPLES ASSIM</div>
          <div className="section-heading">
            <h2>TRÊS PASSOS.<br/><em>UMA SURPRESA.</em></h2>
            <p>Você escolhe o tamanho da emoção. A gente cuida do mistério.</p>
          </div>
          <div className="steps">
            <article className="step"><span className="step-number">01</span><div className="step-icon"><ShieldCheck/></div><h3>ESCOLHA SEU PLANO</h3><p>Decida quantas camisas quer receber por mês. Tem opção pra todo tamanho de coleção.</p></article>
            <article className="step"><span className="step-number">02</span><div className="step-icon"><Sparkles/></div><h3>DEIXE A MÁGICA ACONTECER</h3><p>Uma curadoria de camisas sortidas prepara a surpresa que vai chegar até você.</p></article>
            <article className="step"><span className="step-number">03</span><div className="step-icon"><Zap/></div><h3>ABRA E VIVA O JOGO</h3><p>Todo mês, uma nova caixa. Um novo manto. Mais uma história pra coleção.</p></article>
          </div>
        </section>

        <section className="plans-section" id="planos">
          <div className="section-wrap">
            <div className="section-kicker"><span>03</span> ESCALAÇÃO DEFINIDA</div>
            <div className="plans-title">
              <div><h2>QUAL É O SEU<br/><em>JOGO?</em></h2><p>Escolha seu plano e receba sua dose mensal de futebol.</p></div>
              <div className="monthly-note"><span className="note-star">✳</span><span>ASSINATURA<br/><b>MENSAL</b></span></div>
            </div>
            <div className="plans-grid">
              {plans.map((plan, index) => (
                <article key={plan.id} className={`plan-card ${plan.color} ${selected === plan.id ? 'selected' : ''}`}>
                  <div className="plan-topline"><span>PLANO 0{index + 1}</span>{plan.tag && <span className="plan-tag">{plan.tag}</span>}</div>
                  <div className="plan-visual"><Jersey variant={index} small/><span className="quantity-bubble">{index + 1}x</span></div>
                  <div className="plan-info"><h3>{plan.name}</h3><p>{plan.subtitle}</p></div>
                  <div className="plan-quantity">{plan.quantity}</div>
                  <div className="price"><small>R$</small>{plan.price}<span>/ mês</span></div>
                  <ul>{plan.features.map(f => <li key={f}><Check size={15}/>{f}</li>)}</ul>
                  <button className={plan.color === 'green' ? 'button button-dark' : 'button button-outline'} onClick={() => startSubscription(plan.id)}>ESCOLHER ESTE PLANO <ArrowRight size={16}/></button>
                </article>
              ))}
            </div>
            <p className="price-disclaimer">* Valores ilustrativos para apresentação do protótipo. Condições, frete, disponibilidade e política de cancelamento devem ser definidos antes do lançamento.</p>
          </div>
        </section>

        <section className="manifesto section-wrap">
          <div className="manifesto-mark">“</div>
          <div><span className="section-kicker">PRA QUEM SENTE O FUTEBOL</span><h2>NÃO É SOBRE SABER<br/>QUAL VAI CHEGAR.<br/><em>É SOBRE A EMOÇÃO<br/>DE DESCOBRIR.</em></h2></div>
          <div className="manifesto-aside"><div className="mini-shirts"><Jersey variant={0} small/><Jersey variant={2} small/><Jersey variant={1} small/></div><span>O PRÓXIMO MANTO<br/>PODE SER SEU.</span></div>
        </section>

        <section className="faq-section" id="duvidas">
          <div className="section-wrap faq-layout">
            <div><div className="section-kicker"><span>04</span> ANTES DO APITO</div><h2>FICOU COM<br/><em>DÚVIDA?</em></h2><p>Separamos algumas respostas pra você entrar em campo sem preocupação.</p></div>
            <div className="faq-list">{faqs.map(([q, a], i) => <div className={`faq-item ${openFaq === i ? 'faq-active' : ''}`} key={q}><button onClick={() => setOpenFaq(openFaq === i ? -1 : i)}><span>{q}</span><ChevronDown size={18}/></button>{openFaq === i && <p>{a}</p>}</div>)}</div>
          </div>
        </section>

        <section className="final-cta">
          <div className="cta-orbit"></div><span className="section-kicker">SUA COLEÇÃO COMEÇA AQUI</span><h2>VAI FICAR<br/>SÓ NA <em>TORCIDA?</em></h2><a href="#planos" className="button button-green">ESCOLHER MEU PLANO <ArrowRight size={17}/></a><span className="cta-foot">ASSINE. RECEBA. SURPREENDA-SE.</span>
        </section>
      </main>

      <footer className="footer"><a href="#inicio" className="footer-brand"><img src="./logo-clube-camisa.png" alt="Logo Clube Camisa Surpresa"/></a><div className="footer-center"><b>CLUBE CAMISA SURPRESA</b><span>TODO MÊS, UMA NOVA SURPRESA.</span></div><div className="footer-right"><a href="#planos">PLANOS</a><a href="#duvidas">DÚVIDAS</a><span>© 2026 CLUBE CAMISA</span></div></footer>

      {modal && <div className="modal-backdrop" role="presentation" onMouseDown={(e) => e.target === e.currentTarget && setModal(false)}><div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><button className="modal-close" onClick={() => setModal(false)} aria-label="Fechar"><X/></button><div className="modal-logo"><img src="./logo-clube-camisa.png" alt=""/></div><span className="section-kicker">SUA ESCOLHA FOI ESCALADA</span><h2 id="modal-title">BOM GOSTO<br/><em>DE JOGO.</em></h2><div className="modal-plan"><div><span>PLANO SELECIONADO</span><b>{currentPlan.name}</b><small>{currentPlan.quantity}</small></div><strong>R$ {currentPlan.price}<small>/ mês</small></strong></div><p>Este é um protótipo de apresentação. Nenhuma assinatura ou cobrança será realizada.</p><button className="button button-green modal-action" onClick={() => setModal(false)}>ENTENDI <Check size={17}/></button></div></div>}
    </div>
  )
}

createRoot(document.getElementById('root')).render(<App />)
