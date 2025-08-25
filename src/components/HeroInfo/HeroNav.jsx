import { Button } from "../ui/button"

function HeroNav({links, active, setActive}) {
  

  return (
    <div className='w-full md:absolute bottom-0 right-0 left-0'>
        <ul className='flex  justify-between md:justify-center md:gap-2'>
          {links.map((link, idx) => (
            <li key={idx}>
                <Button
                onClick={() => setActive(link)} 
                className={` font-bold bg-linear-to-b from-transparent from-0%  ${active === link ? 'via-green-600' : 'via-white dark:via-black'} via-50% to-transparent to-100% ${link === active && 'underline'}`} 
                variant='link'>
                  {link}
                </Button>
            </li>
          ))}
        </ul>
      </div>
  )
}

export default HeroNav