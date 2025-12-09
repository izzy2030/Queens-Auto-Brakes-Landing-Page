import os

file_path = 'components/MarketingSections.tsx'
with open(file_path, 'r') as f:
    content = f.read()

target = """        <div className="mt-12 text-center text-xs text-slate-400">
            <span>{t('restrictionsApply')} </span>
            <button className="underline hover:text-cyan-400 transition-colors text-white font-bold" onClick={() => document.dispatchEvent(new CustomEvent('openDetails'))}>{t('seeDetails')}</button>
        </div>"""

replacement = """        <div className="mt-12 text-center text-xs">
            <button 
                onClick={() => document.dispatchEvent(new CustomEvent('openDetails'))}
                className="group cursor-pointer bg-transparent border-0 p-0 inline focus:outline-none"
            >
                <span className="text-slate-400 group-hover:text-cyan-400 transition-colors">{t('restrictionsApply')} </span>
                <span className="text-white font-bold underline group-hover:text-cyan-400 transition-colors">{t('seeDetails')}</span>
            </button>
        </div>"""

if target in content:
    new_content = content.replace(target, replacement)
    with open(file_path, 'w') as f:
        f.write(new_content)
    print("Successfully replaced content.")
else:
    print("Target string not found.")
