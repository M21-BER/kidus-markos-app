interface Props{
 desc:string   
}
const Description: React.FC<Props> = ({desc}) => {
    return (
        <div className='km-card-content'>
        <p>{desc}</p>
       </div>
    );
};

export default Description;