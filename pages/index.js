import React, { useState } from 'react';
import { Search, Download, MessageSquare, Calendar, Loader2 } from 'lucide-react';

const fundingSources = [
  {
    id: 'cmf-anglophone-minority',
    name: 'CMF Anglophone Minority Incentive',
    organization: 'CMF',
    description: 'The Official Language Minority Community Production Funding, ensures that Canadians have access to English-language content reflecting Anglophone culture in the province of Quebec',
    eligibility: 'In order to qualify for the 25% maximum above, the production must use English as the original language of production for the majority of its development and production slate.',
    fundingRange: 'The maximum contribution shall be the lesser of 25% of the Project\'s Eligible Costs or $900,000.',
    deadlines: 'May and September intake periods',
    website: 'https://cmf-fmc.ca/program/official-language-minority-communities-olmc-production-funding/',
    keyPoints: [
      'The initial CMF contribution to the Eligible Project will be in the form of a Licence Fee Top-Up.',
      'Triggering Commitment Threshold: 40% of Eligible Costs or $100,000 per hour, whichever is less (English Documentary Programming).'
    ],
    upcomingDeadlines: [
      { date: '2025-05-22', description: 'Spring Intake Period' },
      { date: '2025-09-23', description: 'Fall Intake Period' }
    ]
  },
  {
    id: 'cmf-broadcaster-envelope',
    name: 'CMF Broadcaster Envelope Program',
    organization: 'CMF',
    description: 'The CMF will contribute to Eligible Projects through English and French Broadcaster Envelope Allocations, which are allotments of CMF Program funds made to Canadian Broadcasters with a track record of supporting Canadian programming.',
    eligibility: 'Canadian Broadcasters may decide what proportion of their Broadcaster Envelope Allocation to allot to an Eligible Project up to the limit of the funds allocated to them.',
    fundingRange: 'The initial CMF contribution to the Eligible Project will be in the form of a Licence Fee Top-Up, up to a maximum of 20% of the Project\'s Eligible Costs.',
    deadlines: 'May and October intake periods',
    website: 'https://cmf-fmc.ca/program/broadcaster-envelope-program-english-and-french/',
    keyPoints: [
      'CMF contribution amounts in excess of this 20% maximum will be in the form of an Equity Investment up to the maximum amount.',
      'Triggering Commitment Threshold: 40% of Eligible Costs or $100,000 per hour, whichever is less (English Documentary Programming).'
    ],
    upcomingDeadlines: [
      { date: '2025-05-01', description: 'Spring Intake Period' },
      { date: '2025-10-17', description: 'Fall Intake Period' }
    ]
  },
  {
    id: 'cmf-distributor',
    name: 'CMF Distributor Program',
    organization: 'CMF',
    description: 'The Distributor Program is a pilot initiative designed to offer more flexibility to Applicants by allowing financial contributions from Eligible Canadian Distributors to trigger Eligible Projects without the requirement of a Canadian Broadcaster.',
    eligibility: '',
    fundingRange: 'The CMF contribution to the Eligible Project will be in the form of a Licence Fee Top-Up up to a maximum percentage of 20% of the Project\'s Eligible Costs.',
    deadlines: 'August intake period',
    website: 'https://cmf-fmc.ca/program/distributor-program/',
    keyPoints: [
      'CMF contribution amounts in excess of the above will be in the form of an Equity Investment up to the maximum amount of 49%.',
      'Triggering Commitment Threshold: 15% of Eligible Costs'
    ],
    upcomingDeadlines: [
      { date: '2025-08-19', description: 'Annual Intake Period' }
    ]
  },
  {
    id: 'cmf-pov',
    name: 'CMF POV Program',
    organization: 'CMF',
    description: 'The CMF contributes to Eligible Projects in this Program under a selective process where the CMF evaluates applications according to an Evaluation Grid.',
    eligibility: 'Eligible Projects in this Program must be English- or French-language one-off Auteur Point of View/Creative Documentaries.',
    fundingRange: 'The initial CMF contribution to the Eligible Project will be in the form of a Licence Fee Top-Up, up to a maximum of 20% of the Project\'s Eligible Costs.',
    deadlines: 'May intake period',
    website: 'https://cmf-fmc.ca/program/pov-program/',
    keyPoints: [
      'The CMF\'s Maximum Contribution in this Program is the lesser of 49% of the Project\'s Eligible Costs or $400,000.',
      'CMF contribution amounts in excess of this 20% maximum will be in the form of an Equity Investment up to the maximum amount.',
      'Triggering Commitment Threshold: 15% of Eligible Costs'
    ],
    upcomingDeadlines: [
      { date: '2025-05-01', description: 'Annual Intake Period' }
    ]
  },
  {
    id: 'cmf-regional-bonus',
    name: 'CMF Regional Bonus Program',
    organization: 'CMF',
    description: 'Regional Production Funding supports the CMF\'s mandate in encouraging linear content funding to the production of Projects across all of Canada.',
    eligibility: '',
    fundingRange: 'The maximum contribution shall be the lesser of 15% of the Project\'s Eligible Costs or $1,00,000.',
    deadlines: 'May and September intake periods',
    website: 'https://cmf-fmc.ca/program/regional-production-funding/',
    keyPoints: [
      'The initial CMF contribution to the Eligible Project will be in the form of a Licence Fee Top-Up.',
      'Triggering Commitment Threshold: 40% of Eligible Costs or $100,000 per hour, whichever is less (English Documentary Programming).'
    ],
    upcomingDeadlines: [
      { date: '2025-05-13', description: 'Spring Intake Period' },
      { date: '2025-09-23', description: 'Fall Intake Period' }
    ]
  }
];

export default function Home() {
  const [selectedFunding, setSelectedFunding] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('browse');

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const handleFundingSelect = (e) => {
    const selected = fundingSources.find(f => f.id === e.target.value);
    setSelectedFunding(selected);
  };

  const generatePDF = () => {
    if (!selectedFunding) return;
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`<html><head><title>${selectedFunding.name}</title><style>body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;padding:60px;line-height:1.8;max-width:800px;margin:0 auto;color:#1f2937}h1{color:#dc2626;font-size:32px;margin-bottom:8px;font-weight:700}.org{color:#6b7280;font-size:18px;margin-bottom:40px}h2{color:#111827;font-size:20px;margin-top:40px;margin-bottom:16px;font-weight:600;border-bottom:2px solid #e5e7eb;padding-bottom:8px}p{margin-bottom:16px;color:#374151}.key-points{margin:0;padding-left:24px}.key-points li{margin-bottom:12px;color:#374151}.website{color:#dc2626;text-decoration:none}</style></head><body><h1>${selectedFunding.name}</h1><div class="org">${selectedFunding.organization}</div><h2>Description</h2><p>${selectedFunding.description}</p>${selectedFunding.eligibility?`<h2>Requirements</h2><p>${selectedFunding.eligibility}</p>`:''}<h2>Funding</h2><p>${selectedFunding.fundingRange}</p><h2>Deadlines</h2><p>${selectedFunding.deadlines}</p>${selectedFunding.keyPoints.length>0?`<h2>Key Points</h2><ul class="key-points">${selectedFunding.keyPoints.map(point=>`<li>${point}</li>`).join('')}</ul>`:''}<h2>Website</h2><p><a href="${selectedFunding.website}" class="website">${selectedFunding.name}</a></p></body></html>`);
    printWindow.document.close();
    printWindow.print();
  };

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;
    const userMessage = {role:'user',content:userInput};
    setChatMessages(prev=>[...prev,userMessage]);
    setUserInput('');
    setIsLoading(true);
    try {
      const fundingContext = fundingSources.map(f=>`${f.name} (${f.organization}): ${f.description} Requirements: ${f.eligibility} Funding: ${f.fundingRange} Deadlines: ${f.deadlines}`).join('\n\n');
      const response = await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'Content-Type':'application/json','x-api-key':process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY||'','anthropic-version':'2023-06-01'},body:JSON.stringify({model:'claude-sonnet-4-20250514',max_tokens:1000,messages:[...chatMessages,userMessage].map(msg=>({role:msg.role,content:msg.content})),system:`You are a helpful assistant specializing in Canadian film and television funding programs. You have access to the following funding sources:\n\n${fundingContext}\n\nHelp users find the right funding programs for their projects. Be specific, helpful, and provide clear recommendations. If asked about requirements, deadlines, or funding amounts, refer to the specific programs above.`})});
      const data = await response.json();
      const assistantMessage = {role:'assistant',content:data.content[0].text};
      setChatMessages(prev=>[...prev,assistantMessage]);
    } catch(error) {
      console.error('Error:',error);
      setChatMessages(prev=>[...prev,{role:'assistant',content:'Sorry, I encountered an error. Please try again.'}]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Canadian Film & TV Funding Navigator</h1>
          <p className="text-gray-600">Explore funding opportunities and get AI-powered guidance for your project</p>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex gap-2 mb-8 bg-white rounded-lg p-1 shadow-sm border border-gray-200">
          <button onClick={()=>setActiveTab('browse')} className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-md font-medium transition-all ${activeTab==='browse'?'bg-red-600 text-white shadow-sm':'text-gray-700 hover:bg-gray-50'}`}><Search size={18}/>Browse Programs</button>
          <button onClick={()=>setActiveTab('calendar')} className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-md font-medium transition-all ${activeTab==='calendar'?'bg-red-600 text-white shadow-sm':'text-gray-700 hover:bg-gray-50'}`}><Calendar size={18}/>Intake Dates</button>
          <button onClick={()=>setActiveTab('chat')} className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-md font-medium transition-all ${activeTab==='chat'?'bg-red-600 text-white shadow-sm':'text-gray-700 hover:bg-gray-50'}`}><MessageSquare size={18}/>AI Assistant</button>
        </div>
        {activeTab==='browse'&&(<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8"><div className="mb-8"><label className="block text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">Select a Funding Program</label><select onChange={handleFundingSelect} className="w-full p-4 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white" defaultValue=""><option value="" disabled>Choose a program...</option>{fundingSources.map(source=>(<option key={source.id} value={source.id}>{source.name}</option>))}</select></div>{selectedFunding&&(<div className="space-y-8"><div className="flex justify-between items-start border-b border-gray-200 pb-6"><div><h2 className="text-2xl font-bold text-gray-900 mb-1">{selectedFunding.name}</h2><p className="text-base text-gray-600">{selectedFunding.organization}</p></div><button onClick={generatePDF} className="flex items-center gap-2 bg-red-600 text-white px-5 py-2.5 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"><Download size={18}/>Export PDF</button></div><div><h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">Description</h3><p className="text-gray-700 leading-relaxed">{selectedFunding.description}</p></div>{selectedFunding.eligibility&&(<div><h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">Requirements</h3><p className="text-gray-700 leading-relaxed">{selectedFunding.eligibility}</p></div>)}<div className="grid md:grid-cols-2 gap-8"><div><h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">Funding</h3><p className="text-gray-700 leading-relaxed">{selectedFunding.fundingRange}</p></div><div><h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">Deadlines</h3><p className="text-gray-700 leading-relaxed">{selectedFunding.deadlines}</p></div></div>{selectedFunding.keyPoints.length>0&&(<div><h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">Key Points</h3><div className="space-y-2">{selectedFunding.keyPoints.map((point,idx)=>(<div key={idx} className="flex items-start gap-3 text-gray-700"><div className="w-1.5 h-1.5 rounded-full bg-red-600 mt-2 flex-shrink-0"></div><span className="leading-relaxed">{point}</span></div>))}</div></div>)}<div><h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">Website</h3><a href={selectedFunding.website} target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-700 hover:underline inline-flex items-center gap-2">{selectedFunding.name}<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg></a></div></div>)}{!selectedFunding&&(<div className="text-center py-16 text-gray-400"><Search size={48} className="mx-auto mb-4 opacity-30"/><p className="text-lg">Select a program to view details</p></div>)}</div>)}
        {activeTab==='calendar'&&(<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8"><div className="mb-8"><h2 className="text-2xl font-bold text-gray-900 mb-2">Intake Dates & Deadlines</h2><p className="text-gray-600">All upcoming application deadlines sorted by date</p></div><div className="space-y-3">{fundingSources.flatMap(source=>(source.upcomingDeadlines||[]).map(deadline=>({...deadline,program:source.name,organization:source.organization,id:source.id}))).sort((a,b)=>new Date(a.date)-new Date(b.date)).map((deadline,idx)=>{const deadlineDate=new Date(deadline.date);const today=new Date();const daysUntil=Math.ceil((deadlineDate-today)/(1000*60*60*24));const isPast=daysUntil<0;const isUpcoming=daysUntil>=0&&daysUntil<=30;return(<div key={idx} className={`flex items-center gap-6 p-5 rounded-lg transition-all ${isPast?'bg-gray-50 opacity-50':isUpcoming?'bg-red-50 border border-red-200':'bg-gray-50 hover:bg-gray-100'}`}><div className="flex-shrink-0 text-center w-20"><div className={`text-3xl font-bold ${isPast?'text-gray-400':'text-red-600'}`}>{deadlineDate.getDate()}</div><div className="text-xs text-gray-600 uppercase font-medium mt-1">{monthNames[deadlineDate.getMonth()].substring(0,3)}</div><div className="text-xs text-gray-500">{deadlineDate.getFullYear()}</div></div><div className="flex-1 min-w-0"><div className="font-semibold text-gray-900 mb-1">{deadline.program}</div><div className="text-sm text-gray-600">{deadline.description}</div><div className="text-xs text-gray-500 mt-1">{deadline.organization}</div></div>{!isPast&&(<div className="flex-shrink-0 text-right"><div className={`text-sm font-semibold ${isUpcoming?'text-red-600':'text-gray-600'}`}>{daysUntil===0?'Today':daysUntil===1?'Tomorrow':`${daysUntil} days`}</div></div>)}</div>);})}</div>{fundingSources.flatMap(s=>s.upcomingDeadlines||[]).length===0&&(<div className="text-center py-16 text-gray-400"><Calendar size={48} className="mx-auto mb-4 opacity-30"/><p className="text-lg">No upcoming deadlines found</p></div>)}</div>)}
        {activeTab==='chat'&&(<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8"><div className="mb-6"><h2 className="text-2xl font-bold text-gray-900 mb-2">AI Funding Assistant</h2><p className="text-gray-600">Ask questions about Canadian film and TV funding programs</p></div><div className="border border-gray-200 rounded-lg h-96 overflow-y-auto p-6 mb-4 bg-gray-50">{chatMessages.length===0?(<div className="h-full flex items-center justify-center text-gray-400"><div className="text-center"><MessageSquare size={48} className="mx-auto mb-4 opacity-30"/><p className="text-lg mb-2">Ask me anything about funding programs</p><p className="text-sm text-gray-500">Try: "What programs are best for documentaries?"</p></div></div>):(<div className="space-y-4">{chatMessages.map((msg,idx)=>(<div key={idx} className={`flex ${msg.role==='user'?'justify-end':'justify-start'}`}><div className={`max-w-[80%] p-4 rounded-lg ${msg.role==='user'?'bg-red-600 text-white':'bg-white border border-gray-200 text-gray-900'}`}><p className="text-sm whitespace-pre-wrap">{msg.content}</p></div></div>))}{isLoading&&(<div className="flex justify-start"><div className="bg-white border border-gray-200 p-4 rounded-lg flex items-center gap-2 text-gray-500"><Loader2 className="animate-spin" size={16}/><span className="text-sm">Thinking...</span></div></div>)}</div>)}</div><div className="flex gap-3"><input type="text" value={userInput} onChange={(e)=>setUserInput(e.target.value)} onKeyPress={(e)=>{if(e.key==='Enter'&&!isLoading){handleChatSubmit(e);}}} placeholder="Ask about funding programs..." className="flex-1 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent" disabled={isLoading}/><button onClick={handleChatSubmit} disabled={isLoading} className="bg-red-600 text-white px-8 py-4 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium">Send</button></div></div>)}
      </div>
    </div>
  );
}
