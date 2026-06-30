export default function Button({children,type='button',className=''}){return <button type={type} className={`btn btn-primary ${className}`}>{children}</button>}
