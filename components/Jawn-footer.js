import Image from 'next/image'

const JawnFooter = (props) => {
  return (
    <div className={`doge-footer_wrapper ${props.location}`}>
      <p><span className="blink">_ </span><a target="_blank" href="https://p46whvwxhsl5lftsqabgdimdlemq5ppg6wc3fcw7z5yl22we.arweave.net/fz1j_1tc8l9WWcoACYaGDWRkOveb1h-bKK389w-vWrE">metadata </a></p>
          <p><span className="blink">_ </span><a target="_blank" href="https://twitter.com/jawnciego">twitter</a></p>
          <p><span className="blink">_ </span><a target="_blank" href="https://instagram.com/jawndiego">gram </a></p>
     
    </div>
  )
}

export default JawnFooter;