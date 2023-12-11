export const P = ({ Class, text }) => <p className={Class}>{text}</p>
export const A = ({ Class, text, icone, Link }) => <a href={Link} className={Class}><i className={icone}></i> {text}</a>
export const Input = ({ Class, PlaceHolder, Type, Value, Name, Id }) => <input className={Class} placeholder={PlaceHolder} value={Value} type={Type} name={Name} id={Id} ></input>



