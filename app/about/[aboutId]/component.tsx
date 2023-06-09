'use client';

function Component() {
  const handleTest = () => { alert('test!!'); }

  return (
    <div>
      <button onClick={handleTest}>ClickMe!</button>
    </div>
  )
}

export default Component;
