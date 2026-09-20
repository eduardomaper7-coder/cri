const { test } = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
function setup(choice, labels = false) {
  const scripts = [], listeners = {};
  const context = { window: {}, location: {href:'https://www.cri-tenerife.com/'}, URL,
    localStorage: {getItem:()=>choice},
    document: {head:{appendChild:s=>scripts.push(s)}, createElement:()=>({}), addEventListener:(type,fn)=>listeners[type]=fn, querySelector:()=>null} };
  let source = fs.readFileSync('assets/js/ads.js','utf8');
  if (labels) source = source.replace(/const labels = \{[^}]+\}/, "const labels = { whatsapp: 'WA', appointment: 'AP' }");
  vm.runInNewContext(source,context);
  return {context,scripts,listeners};
}
test('rejected consent loads no Google script and sends no event',()=>{
  const {context,scripts}=setup('no',true); context.window.criConversion('whatsapp'); assert.equal(scripts.length,0); assert.equal(context.window.dataLayer,undefined);
});
test('unknown actions never create bogus conversions',()=>{
  const {context}=setup('yes'); context.window.criConversion('contact'); assert.equal(context.window.dataLayer.filter(x=>x[0]==='event').length,0);
});
test('Doctoralia uses the supplied appointment identifier',()=>{
  const {context,listeners}=setup('yes');
  listeners.click({target:{closest:()=>({href:'https://www.doctoralia.es/clinicas/cri-centro-de-rehabilitacion-integral?saasonly=true'})}});
  const events=context.window.dataLayer.filter(x=>x[0]==='event');
  assert.equal(events.length,1);
  assert.equal(events[0][2].send_to,'AW-17884011678/V8xWCIS-y_4cEJ654c9C');
});
test('WhatsApp uses the identifier supplied by Google Ads',()=>{
  const {context,listeners}=setup('yes');
  listeners.click({target:{closest:()=>({href:'https://wa.me/34675688826'})}});
  const events=context.window.dataLayer.filter(x=>x[0]==='event');
  assert.equal(events.length,1);
  assert.equal(events[0][2].send_to,'AW-17884011678/uNeICKDOyP4cEJ654c9C');
});
test('links use distinct conversion labels',()=>{
  const {context,listeners}=setup('yes',true);
  for (const href of ['https://wa.me/34675688826','https://www.doctoralia.es/clinicas/cri','https://example.com/']) listeners.click({target:{closest:()=>({href})}});
  const events=context.window.dataLayer.filter(x=>x[0]==='event');
  assert.equal(events.length,2);
  assert.deepEqual(Array.from(events,x=>x[2].send_to),['AW-17884011678/WA','AW-17884011678/AP']);
});
