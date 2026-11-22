import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowDown, ArrowRight, Check, ChevronDown, CircleHelp, Menu, ShieldCheck, Shirt, Sparkles, X, Zap } from 'lucide-react'
import './styles.css'

const plans = [
  {
    id: 'nacional',
    name: 'Nacional',
    subtitle: 'Pra vestir as cores do futebol brasileiro',
    quantity: '1 camisa de clube brasileiro',
    price: '79,90',
    tag: '',
    kind: 'national',
    features: ['1 camisa de clube brasileiro por mês', 'Escolha vários times favoritos', 'Bloqueie clubes que não quer receber', 'Frete calculado na finalização'],
    color: 'white'
  },
  {
    id: 'marcas',
    name: 'Marcas',
    subtitle: 'Estilo dentro e fora de campo',
    quantity: '1 camisa de marca esportiva',
    price: '79,90',
    tag: 'NOVIDADE',
    kind: 'brand',
    features: ['Nike, Adidas, Puma ou marca sortida', 'Escolha sua marca favorita', 'Uma nova surpresa todo mês', 'Frete calculado na finalização'],
    color: 'green'
  },
  {
    id: 'misto',
    name: 'Misto',
    subtitle: 'O melhor dos dois mundos',
    quantity: '3 camisas surpresa',
    price: '189,90',
    tag: 'MÁXIMA SURPRESA',
    kind: 'mixed',
    features: ['Camisas de clubes brasileiros e marcas', 'Surpresas variadas mês a mês', 'Personalize seus times e marcas favoritas', 'Frete calculado na finalização'],
    color: 'dark'
  }
]

const brazilianClubs = [
  'Athletico-PR', 'Atlético-MG', 'Bahia', 'Botafogo', 'Ceará', 'Corinthians',
  'Coritiba', 'Cruzeiro', 'Flamengo', 'Fluminense', 'Fortaleza', 'Goiás',
  'Grêmio', 'Internacional', 'Juventude', 'Mirassol', 'Palmeiras',
  'Red Bull Bragantino', 'Santos', 'São Paulo', 'Sport', 'Vasco', 'Vitória'
];

const faqs = [
  ['Como funciona a surpresa?', 'Você escolhe um plano e recebe mensalmente a quantidade de camisas correspondente. Os modelos e times são surpresa — é parte da experiência do clube.'],
  ['Posso escolher meus times?', 'Sim! Nos planos Nacional e Misto, você pode selecionar vários clubes brasileiros favoritos e bloquear os times que não deseja receber.'],
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
  const [shirtSize, setShirtSize] = useState('')
  const [favoriteTeams, setFavoriteTeams] = useState([])
  const [blockedTeams, setBlockedTeams] = useState([])
  const [favoriteSearch, setFavoriteSearch] = useState('')
  const [blockedSearch, setBlockedSearch] = useState('')
  const [brandChoice, setBrandChoice] = useState('sortida')
  const [mixPreference, setMixPreference] = useState('sortido')
  const [checkoutStep, setCheckoutStep] = useState(1)
  const [orderComplete, setOrderComplete] = useState(false)
  const [customer, setCustomer] = useState({ name: '', email: '', phone: '', cep: '', state: '', city: '', neighborhood: '', street: '', number: '', complement: '' })
  const currentPlan = plans.find(p => p.id === selected)

  const startSubscription = (id) => {
    setSelected(id)
    setShirtSize('')
    setFavoriteTeams([])
    setBlockedTeams([])
    setFavoriteSearch('')
    setBlockedSearch('')
    setBrandChoice('sortida')
    setMixPreference('sortido')
    setCheckoutStep(1)
    setOrderComplete(false)
    setCustomer({ name: '', email: '', phone: '', cep: '', state: '', city: '', neighborhood: '', street: '', number: '', complement: '' })
    setModal(true)
  }

  const updateCustomer = (field, value) => setCustomer(prev => ({ ...prev, [field]: value }))

  const saveDemoOrder = () => {
    const order = {
      id: `CCS-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'Aguardando confirmação do pagamento',
      plan: { id: currentPlan.id, name: currentPlan.name, price: currentPlan.price, quantity: currentPlan.quantity },
      customer,
      preferences: { shirtSize, favoriteTeams, blockedTeams, brandChoice, mixPreference }
    }
    try {
      const previous = JSON.parse(localStorage.getItem('clube-camisa-orders') || '[]')
      localStorage.setItem('clube-camisa-orders', JSON.stringify([...previous, order]))
    } catch (error) {
      console.warn('Não foi possível salvar o pedido neste navegador.', error)
    }
    setOrderComplete(true)
  }

  const toggleTeam = (team, selectedTeams, setter) => {
    setter(selectedTeams.includes(team)
      ? selectedTeams.filter(item => item !== team)
      : [...selectedTeams, team])
  }

  const filteredFavorites = brazilianClubs.filter(team =>
    team.toLowerCase().includes(favoriteSearch.toLowerCase()) && !blockedTeams.includes(team)
  )
  const filteredBlocked = brazilianClubs.filter(team =>
    team.toLowerCase().includes(blockedSearch.toLowerCase()) && !favoriteTeams.includes(team)
  )

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

      {modal && <div className="modal-backdrop checkout-backdrop" role="presentation" onMouseDown={(e) => e.target === e.currentTarget && setModal(false)}>
        <div className="modal modal-wide checkout-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <button className="modal-close" onClick={() => setModal(false)} aria-label="Fechar"><X/></button>
          {!orderComplete ? <>
            <div className="checkout-heading">
              <div className="modal-logo"><img src="./logo-clube-camisa.png" alt=""/></div>
              <span className="section-kicker">FINALIZAÇÃO DO PEDIDO</span>
              <h2 id="modal-title">SUA PRÓXIMA<br/><em>CAMISA COMEÇA AQUI.</em></h2>
            </div>
            <div className="checkout-progress" aria-label={`Etapa ${checkoutStep} de 4`}>
              {['Preferências', 'Seus dados', 'Entrega', 'Revisão'].map((label, index) => <div key={label} className={checkoutStep >= index + 1 ? 'progress-step active' : 'progress-step'}><span>{index + 1}</span><small>{label}</small></div>)}
            </div>
            <div className="checkout-plan-strip">
              <div><span>SEU PLANO</span><b>{currentPlan.name}</b><small>{currentPlan.quantity}</small></div>
              <strong>R$ {currentPlan.price}</strong>
            </div>

            {checkoutStep === 1 && <section className="checkout-panel">
              <span className="checkout-eyebrow">ETAPA 01 / 04</span><h3>PERSONALIZE SUA CAMISA</h3>
              <div className="custom-field"><label htmlFor="shirt-size">Tamanho da camisa *</label><select id="shirt-size" value={shirtSize} onChange={e => setShirtSize(e.target.value)}><option value="">Selecione seu tamanho</option>{['PP', 'P', 'M', 'G', 'GG', 'XGG'].map(size => <option key={size} value={size}>{size}</option>)}</select></div>
              {(currentPlan.kind === 'national' || currentPlan.kind === 'mixed') && <>
                {currentPlan.kind === 'mixed' && <div className="custom-field"><span className="field-label">Qual tipo de surpresa você prefere?</span><div className="choice-list"><label><input type="radio" name="mix-preference" checked={mixPreference === 'sortido'} onChange={() => setMixPreference('sortido')}/> Deixar totalmente sortido</label><label><input type="radio" name="mix-preference" checked={mixPreference === 'clubes'} onChange={() => setMixPreference('clubes')}/> Dar preferência a clubes brasileiros</label><label><input type="radio" name="mix-preference" checked={mixPreference === 'marcas'} onChange={() => setMixPreference('marcas')}/> Dar preferência a marcas esportivas</label></div></div>}
                {(currentPlan.kind === 'national' || mixPreference !== 'marcas') && <>
                  <div className="custom-field"><span className="field-label">Seus clubes favoritos <small>(selecione vários)</small></span><input className="team-search" type="search" placeholder="Buscar clube brasileiro..." value={favoriteSearch} onChange={e => setFavoriteSearch(e.target.value)}/><div className="team-grid">{filteredFavorites.map(team => <label key={team} className={favoriteTeams.includes(team) ? 'team-option active' : 'team-option'}><input type="checkbox" checked={favoriteTeams.includes(team)} onChange={() => toggleTeam(team, favoriteTeams, setFavoriteTeams)}/>{team}</label>)}</div><small className="selection-count">{favoriteTeams.length} favorito(s) selecionado(s)</small></div>
                  <div className="custom-field"><span className="field-label">Clubes que você não quer receber <small>(opcional)</small></span><input className="team-search" type="search" placeholder="Buscar clube para bloquear..." value={blockedSearch} onChange={e => setBlockedSearch(e.target.value)}/><div className="team-grid">{filteredBlocked.map(team => <label key={team} className={blockedTeams.includes(team) ? 'team-option blocked' : 'team-option'}><input type="checkbox" checked={blockedTeams.includes(team)} onChange={() => toggleTeam(team, blockedTeams, setBlockedTeams)}/>{team}</label>)}</div><small className="selection-count">{blockedTeams.length} clube(s) bloqueado(s)</small></div>
                </>}
              </>}
              {(currentPlan.kind === 'brand' || (currentPlan.kind === 'mixed' && mixPreference !== 'clubes')) && <div className="custom-field"><span className="field-label">Marca esportiva {currentPlan.kind === 'mixed' ? '(opcional)' : '*'}</span><div className="brand-grid">{[['nike', 'Nike'], ['adidas', 'Adidas'], ['puma', 'Puma'], ['sortida', 'Marca sortida']].map(([value, label]) => <label key={value} className={brandChoice === value ? 'brand-option active' : 'brand-option'}><input type="radio" name="brand-choice" checked={brandChoice === value} onChange={() => setBrandChoice(value)}/>{label}</label>)}</div></div>}
              <p className="checkout-hint">As preferências ajudam nossa equipe a preparar sua surpresa.</p>
              <div className="checkout-actions"><button className="button button-green" disabled={!shirtSize || (currentPlan.kind === 'national' && favoriteTeams.length === 0)} onClick={() => setCheckoutStep(2)}>CONTINUAR <ArrowRight size={16}/></button></div>
            </section>}

            {checkoutStep === 2 && <section className="checkout-panel">
              <span className="checkout-eyebrow">ETAPA 02 / 04</span><h3>QUEM VAI RECEBER?</h3><p className="checkout-description">Precisamos dos seus dados para identificar o pedido e entrar em contato sobre a entrega.</p>
              <div className="checkout-fields">
                <div className="custom-field field-full"><label htmlFor="customer-name">Nome completo *</label><input id="customer-name" value={customer.name} onChange={e => updateCustomer('name', e.target.value)} placeholder="Como podemos te chamar?"/></div>
                <div className="custom-field"><label htmlFor="customer-email">E-mail *</label><input id="customer-email" type="email" value={customer.email} onChange={e => updateCustomer('email', e.target.value)} placeholder="voce@email.com"/></div>
                <div className="custom-field"><label htmlFor="customer-phone">WhatsApp com DDD *</label><input id="customer-phone" type="tel" value={customer.phone} onChange={e => updateCustomer('phone', e.target.value)} placeholder="(11) 99999-9999"/></div>
              </div>
              <div className="checkout-actions"><button className="button button-outline" onClick={() => setCheckoutStep(1)}>VOLTAR</button><button className="button button-green" disabled={!customer.name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email) || customer.phone.replace(/\D/g, '').length < 10} onClick={() => setCheckoutStep(3)}>CONTINUAR <ArrowRight size={16}/></button></div>
            </section>}

            {checkoutStep === 3 && <section className="checkout-panel">
              <span className="checkout-eyebrow">ETAPA 03 / 04</span><h3>ONDE ENTREGAMOS?</h3><p className="checkout-description">Informe o endereço completo para receber sua camisa.</p>
              <div className="checkout-fields">
                <div className="custom-field"><label htmlFor="customer-cep">CEP *</label><input id="customer-cep" inputMode="numeric" value={customer.cep} onChange={e => updateCustomer('cep', e.target.value)} placeholder="00000-000"/></div>
                <div className="custom-field"><label htmlFor="customer-state">Estado (UF) *</label><input id="customer-state" maxLength="2" value={customer.state} onChange={e => updateCustomer('state', e.target.value.toUpperCase())} placeholder="SP"/></div>
                <div className="custom-field"><label htmlFor="customer-city">Cidade *</label><input id="customer-city" value={customer.city} onChange={e => updateCustomer('city', e.target.value)} placeholder="Sua cidade"/></div>
                <div className="custom-field"><label htmlFor="customer-neighborhood">Bairro *</label><input id="customer-neighborhood" value={customer.neighborhood} onChange={e => updateCustomer('neighborhood', e.target.value)} placeholder="Seu bairro"/></div>
                <div className="custom-field field-full"><label htmlFor="customer-street">Rua / Avenida *</label><input id="customer-street" value={customer.street} onChange={e => updateCustomer('street', e.target.value)} placeholder="Nome da rua"/></div>
                <div className="custom-field"><label htmlFor="customer-number">Número *</label><input id="customer-number" value={customer.number} onChange={e => updateCustomer('number', e.target.value)} placeholder="Nº"/></div>
                <div className="custom-field"><label htmlFor="customer-complement">Complemento</label><input id="customer-complement" value={customer.complement} onChange={e => updateCustomer('complement', e.target.value)} placeholder="Apto, bloco, referência..."/></div>
              </div>
              <div className="checkout-actions"><button className="button button-outline" onClick={() => setCheckoutStep(2)}>VOLTAR</button><button className="button button-green" disabled={!customer.cep.trim() || !customer.state.trim() || !customer.city.trim() || !customer.neighborhood.trim() || !customer.street.trim() || !customer.number.trim()} onClick={() => setCheckoutStep(4)}>REVISAR PEDIDO <ArrowRight size={16}/></button></div>
            </section>}

            {checkoutStep === 4 && <section className="checkout-panel">
              <span className="checkout-eyebrow">ETAPA 04 / 04</span><h3>CONFIRA SEU PEDIDO</h3>
              <div className="review-card">
                <div className="review-row"><span>Plano</span><b>{currentPlan.name} — R$ {currentPlan.price}</b></div>
                <div className="review-row"><span>Camisa</span><b>Tamanho {shirtSize} · {currentPlan.quantity}</b></div>
                {favoriteTeams.length > 0 && <div className="review-row"><span>Clubes favoritos</span><b>{favoriteTeams.join(', ')}</b></div>}
                {blockedTeams.length > 0 && <div className="review-row"><span>Clubes bloqueados</span><b>{blockedTeams.join(', ')}</b></div>}
                {(currentPlan.kind === 'brand' || currentPlan.kind === 'mixed') && <div className="review-row"><span>Marca</span><b>{{nike:'Nike',adidas:'Adidas',puma:'Puma',sortida:'Marca sortida'}[brandChoice]}</b></div>}
                <div className="review-divider"/>
                <div className="review-row"><span>Cliente</span><b>{customer.name}</b></div>
                <div className="review-row"><span>Contato</span><b>{customer.email} · {customer.phone}</b></div>
                <div className="review-row"><span>Entrega</span><b>{customer.street}, {customer.number}{customer.complement ? ` — ${customer.complement}` : ''}<br/>{customer.neighborhood}, {customer.city} - {customer.state}, CEP {customer.cep}</b></div>
                <div className="review-total"><span>Total do pedido</span><strong>R$ {currentPlan.price}</strong></div>
              </div>
              <p className="checkout-hint">Ao finalizar, seu pedido ficará aguardando a confirmação manual do pagamento. O link de pagamento do proprietário ainda precisa ser configurado.</p>
              <div className="checkout-actions"><button className="button button-outline" onClick={() => setCheckoutStep(3)}>VOLTAR</button><button className="button button-green" onClick={saveDemoOrder}>FINALIZAR PEDIDO <Check size={16}/></button></div>
            </section>}
          </> : <section className="checkout-success">
            <div className="success-mark"><Check size={34}/></div>
            <span className="section-kicker">PEDIDO REGISTRADO NESTE DISPOSITIVO</span>
            <h2>FALTA POUCO<br/><em>PRA SURPRESA.</em></h2>
            <p>Seu pedido foi salvo localmente como demonstração. Ele ainda não foi enviado para a loja e o pagamento não foi realizado.</p>
            <div className="success-details"><span>PLANO</span><b>{currentPlan.name} · R$ {currentPlan.price}</b><span>CLIENTE</span><b>{customer.name}</b><span>STATUS</span><b>Aguardando confirmação do pagamento</b></div>
            <p className="checkout-hint">Para receber pedidos de verdade, falta conectar o formulário a um banco de dados ou canal de atendimento e configurar o link de pagamento do proprietário.</p>
            <button className="button button-green modal-action" onClick={() => setModal(false)}>VOLTAR À LOJA <ArrowRight size={16}/></button>
          </section>}
        </div>
      </div>}
    </div>
  )
}

createRoot(document.getElementById('root')).render(<App />)
