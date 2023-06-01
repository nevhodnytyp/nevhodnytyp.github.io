import './LoaderStyles.css'

type Props = {
  className?: string
}

const Loader: React.FC<Props> = ({ className }) => {
  return (
    <div className={`flex place-content-center ${className}`}>
      <div className="wrapper">
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="shadow"></div>
        <div className="shadow"></div>
        <div className="shadow"></div>
      </div>
    </div>
  )
}

export default Loader
