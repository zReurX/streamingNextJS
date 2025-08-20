
import Link from 'next/link'

function ButtonCard({ children, link='', text }) {
    return (
        <div className='flex flex-col gap-2 items-center'>
            <Link href={link}>
                {children}
                
            </Link>
            <p className='text-base text-muted-foreground'>{text}</p>
        </div>
    )
}

export default ButtonCard