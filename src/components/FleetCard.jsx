import React, { useState } from 'react';
import { Icon, Button, Spec, Badge } from './Primitives';

export function FleetCard({ v, onOpen }) {
  return (
    <article className="vehicle" onClick={() => onOpen && onOpen(v)}>
      <div className="ph">
        <img src={v.photo} alt={v.name} />
        {v.popular && <span className="badge badge--amber-solid tag"><Icon name="star" size={14} className="ic" />Népszerű</span>}
      </div>
      <div className="body">
        <h3>{v.name}</h3>
        <div className="specs">
          <Spec icon="users">{v.seats}</Spec>
          <Spec icon="cog">{v.trans}</Spec>
          <Spec icon="gauge">{v.km}</Spec>
        </div>
        <div className="foot">
          <div className="price">{v.price} <small>Ft / nap-tól</small></div>
          <Button variant="primary" size="sm" iconRight="arrow-right">Részletek</Button>
        </div>
      </div>
    </article>
  );
}

function FAQItem({ question, answer, isOpen, onToggle }) {
  const contentRef = React.useRef(null);
  const [height, setHeight] = React.useState(0);

  React.useEffect(() => {
    if (isOpen && contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [isOpen]);

  return (
    <div className={'faq-item' + (isOpen ? ' open' : '')}>
      <button className="faq-q" onClick={onToggle} type="button">
        {question}
        <Icon name="chevron-down" size={20} className="ic" style={{ transform: isOpen ? 'rotate(180deg)' : 'none' }} />
      </button>
      <div className="faq-a" style={{ maxHeight: height }}>
        <div className="faq-a-inner" ref={contentRef}>{answer}</div>
      </div>
    </div>
  );
}

export function FAQList({ items, limit }) {
  const [open, setOpen] = useState(0);
  const list = limit ? items.slice(0, limit) : items;
  return (
    <div className="faq">
      {list.map((f, i) => (
        <FAQItem
          key={i}
          question={f.q}
          answer={f.a}
          isOpen={open === i}
          onToggle={() => setOpen(open === i ? -1 : i)}
        />
      ))}
    </div>
  );
}
