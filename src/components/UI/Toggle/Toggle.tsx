import './Toggle.css'
interface Props {
change:()=>void 
}
const Toggle: React.FC<Props> = ({change}) => {
    return (
        <div className='toggle'>
        <label className="switch">
        <input type="checkbox" onChange={change}/>
        <span className="slider round"></span>
        </label>
        
        </div>
    );
};

export default Toggle;