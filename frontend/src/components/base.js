
export const P = ({ Class, text, Id }) => <p id={Id} className={Class}>{text}</p>
export const A = ({ Class, text, icone, Link }) => <a href={Link} className={Class}><i className={icone}></i> {text}</a>
export const Input = ({ Class, PlaceHolder, Type, Value, Name, onChange, Id }) => <input className={Class} placeholder={PlaceHolder} required value={Value} onChange={onChange} type={Type} name={Name} id={Id} ></input>
export const Button = ({ Class, onSubmit, text }) => <button className={Class} onSubmit={onSubmit}>{text}</button>


