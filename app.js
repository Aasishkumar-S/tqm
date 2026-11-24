const unitNames = ['Introduction to TQM', 'TQM principles', 'Statistical process control', 'Quality management tools', 'Quality systems'];
const firstParts = [2, 2, 1, 1, 2];
const main = document.querySelector('main');
const menu = document.querySelector('.mobilemenu');
const escapeText = text => text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const link = topic => '#unit-' + topic.unit + '/' + topic.id;
const unitTopics = unit => topics.filter(topic => topic.unit === unit);
const firstTopic = unit => unitTopics(unit).find(topic => topic.part === firstParts[unit - 1]);
const terms = /\b(rational subgroups|grand mean|defective unit|individual defects|inspection unit|end-to-end process|cycle time|lead time|shared responsibility|open communication|continuous improvement|customer satisfaction|fitness for use|conformance to requirements|quality policy|quality council|quality circle|quality planning|quality control|quality improvement|customer focus|common causes?|assignable causes?|quality audit|corrective action|prevention|appraisal|internal failure|external failure|performance|reliability|retention|capability|DMAIC|DPMO|PDCA|OEE|RPN|SMART|Seiri|Seiton|Seiso|Seiketsu|Shitsuke|intrinsic|extrinsic|empowerment|stakeholder|effectiveness|efficiency|pareto chart|histogram|fishbone diagram|orthogonal arrays|zero defects|severity|occurrence|detection|benchmarking|Cp|Cpk|process owner|customer requirements|specification limits?|control limits?|recognition|reward|autonomous maintenance|quality cost|vision|mission|policy|Juran|Deming|Kaizen|quality circle|matrix diagram)\b/gi;
function highlight(text) {
  let count = 0;
  return escapeText(text).replace(terms, word => ++count <= 3 ? '<mark>' + word + '</mark>' : word);
}
function tree(root, children) {
  return '<div class="tree"><div class="branch">' + root + '</div><div class="stem"></div><div class="leaves">' + children.map(item => '<div class="node">' + item + '</div>').join('') + '</div></div>';
}
function table(headers, rows) {
  return '<table><thead><tr>' + headers.map(h => '<th scope="col">' + h + '</th>').join('') + '</tr></thead><tbody>' + rows.map(row => '<tr>' + row.map((v,i) => i === 0 ? '<th scope="row">'+v+'</th>' : '<td>'+v+'</td>').join('') + '</tr>').join('') + '</tbody></table>';
}
function chart(label, body) {
  return '<svg class="chart" viewBox="0 0 560 216" role="img" aria-label="'+label+'" fill="#173f33" font-family="Arial,sans-serif" font-size="15">'+body+'</svg>';
}
function meanChart() {
  const values=[30,32,30,34,31], x=i=>55+i*85, y=v=>181-(v-29)*28;
  const lines=[[32.858,'UCL 32.86'],[31.4,'CL 31.40'],[29.942,'LCL 29.94']].map(([v,label])=>'<path d="M38 '+y(v)+'H425" stroke="#728b7c" stroke-dasharray="5 4"/><text x="435" y="'+(y(v)+5)+'">'+label+'</text>').join('');
  return chart('Batch means 30, 32, 30, 34, 31. Batch four exceeds the upper control limit.',lines+'<polyline fill="none" stroke="#176452" stroke-width="3" points="'+values.map((v,i)=>x(i)+','+y(v)).join(' ')+'"/>'+values.map((v,i)=>'<circle cx="'+x(i)+'" cy="'+y(v)+'" r="5"/><text text-anchor="middle" x="'+x(i)+'" y="'+(y(v)-10)+'">'+v+'</text><text text-anchor="middle" x="'+x(i)+'" y="201">Batch '+(i+1)+'</text>').join(''));
}
function diagram(t) {
  const name=t.name;
  if(name.startsWith('Cost of')) return tree('Total cost of quality',['Prevention · training','Appraisal · inspection','Internal failure · scrap','External failure · warranty']);
  if(name.startsWith('Variable control')) return meanChart();
  if(name.startsWith('Attribute control')) return table(['What is counted?','Fixed inspection size','Varying inspection size'],[['Defective units','np (count) or p (fraction)','p (fraction)'],['Individual defects','c (count) or u (rate)','u (rate)']]);
  if(name.startsWith('Building the House')) return '<div class="roof">Technical correlations</div>'+table(['Customer WHAT','Weight','Grade','Mix','Cure'],[['Durability',5,9,3,3],['Strength',4,9,9,3],['Workability',3,3,9,1],['Technical priority','Σ',90,78,30]])+'<p style="text-align:center;font-size:.85rem;margin-top:8px">HOWs across columns · Strong 9 / Medium 3 / Weak 1</p>';
  if(name.startsWith('Taguchi')) return chart('Loss is zero at target. At twice the deviation loss is four times higher.','<path d="M60 15V172H525" fill="none" stroke="#637c71"/><path d="M90 32 Q280 312 470 32" fill="none" stroke="#176452" stroke-width="4"/><text x="69" y="22">Loss</text><text x="235" y="200">Target T</text><text x="410" y="200">Actual value</text><circle cx="280" cy="172" r="4"/><text x="232" y="57">L = k(y − T)²</text>');
  if(name.startsWith('Product and service')) return table(['Product · Garvin','Service · SERVQUAL'],[['Performance, features','Reliability, assurance'],['Reliability, conformance','Tangibles, empathy'],['Durability, serviceability','Responsiveness'],['Aesthetics, perceived quality','Five service dimensions']]);
  if(name.startsWith('Seven quality philosophies')) return tree('Improving quality',['Deming · PDCA','Juran · trilogy','Crosby · prevention','Imai · Kaizen','Feigenbaum · total control','Ishikawa · circles','Taguchi · robust design']);
  if(name.startsWith('Seven basic')) return chart('Fishbone for low concrete strength. Possible causes include excess water, poor aggregate, batching error and insufficient curing.','<g stroke="#176452" stroke-width="2" fill="none"><path d="M25 105H350l-8 -6m8 6-8 6 M125 105L66 52 M225 105l-60 -53 M143 105l-54 50 M264 105l-50 50"/></g><text x="22" y="40">Excess water</text><text x="150" y="40">Poor aggregate</text><text x="31" y="183">Batching error</text><text x="188" y="183">Poor curing</text><text x="363" y="111">Low concrete strength</text>');
  if(name.startsWith('Quality audits')) return tree('Who performs the audit?',['First party · internal','Second party · customer','Third party · independent body']);
  if(name.startsWith('Process capability')) return table(['Index','What it compares','Interpretation'],[['Cp','Tolerance width ÷ 6σ','Potential capability'],['Cpk','Nearest limit distance ÷ 3σ','Includes centring']]);
  if(name.startsWith('Employee empowerment')) return tree('Decision at the point of work',['Authority','Competence','Information','Resources']);
  return '<div class="flow">'+t.flow.split(/ → | ← /).map(s=>'<span class="node">'+escapeText(s)+'</span>').join('<span class="arrow" aria-hidden="true">→</span>')+'</div>';
}
function sidebar(t) {
  return [1,2].map(p=>'<div class="group">Part '+p+(p===firstParts[t.unit-1]?'<span class="first">Study first</span>':'')+'</div>'+unitTopics(t.unit).filter(item=>item.part===p).map(item=>'<a class="topic" href="'+link(item)+'" '+(item===t?'aria-current="page"':'')+'>'+escapeText(item.name)+'</a>').join('')).join('');
}
function render() {
  const t=topics.find(item=>link(item)===location.hash)||firstTopic(1);
  document.title=t.name+' · TQM Study Desk';
  document.querySelector('.units').innerHTML=unitNames.map((name,i)=>'<a href="'+link(firstTopic(i+1))+'" title="'+name+'" '+(i+1===t.unit?'aria-current="true"':'')+'>Unit '+(i+1)+'</a>').join('');
  const nav=sidebar(t);
  document.querySelector('.sidebar').innerHTML='<div class="eyebrow">Unit '+t.unit+' / 05</div><h2>'+unitNames[t.unit-1]+'</h2><nav aria-label="Topics">'+nav+'</nav>';
  menu.querySelector('nav').innerHTML=nav;
  menu.querySelector('summary').textContent='Topics in Unit '+t.unit+' · '+unitNames[t.unit-1];
  menu.open=false;
  const index=topics.indexOf(t);
  const prev=topics[index-1], next=topics[index+1];
  main.innerHTML='<p class="meta">Unit '+t.unit+' &nbsp;/&nbsp; CDAP Part '+t.part+'</p><h1>'+escapeText(t.name)+'</h1><figure><figcaption>Diagram to practise</figcaption><div class="diagram">'+diagram(t)+'</div></figure><div class="subhead"><h2>16-mark answer</h2><span class="source">Module '+t.unit+' · Slides '+t.slides+'</span></div><article class="answer">'+t.sections.map(([heading,body])=>heading==='Recall'?'<div class="recall"><strong>Quick recall</strong>'+highlight(body)+'</div>':'<section><h3>'+escapeText(heading)+'</h3><p>'+highlight(body)+'</p></section>').join('')+'</article><nav class="pager" aria-label="Adjacent topics">'+(prev?'<a href="'+link(prev)+'"><small>Previous topic</small>'+escapeText(prev.name)+'</a>':'')+(next?'<a href="'+link(next)+'"><small>Next topic</small>'+escapeText(next.name)+'</a>':'')+'</nav>';
}
window.addEventListener('hashchange',()=>{render();main.focus({preventScroll:true});window.scrollTo(0,0);});
menu.addEventListener('click',e=>{if(e.target.closest('a')?.getAttribute('href')===location.hash) menu.open=false;});
render();
