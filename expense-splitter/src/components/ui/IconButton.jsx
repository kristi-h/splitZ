export default function IconButton({children, icon, onClick}) {
    const iconType = `fa-${icon}`
    
  return (
        <button onClick={onClick} className='flex flex-col text-white rounded-lg w-[96px] h-[64px] py-[0.16rem] items-center mx-auto hover:bg-white hover:text-primary/90 transition-all'>
            <i className={`fa-solid ${iconType} text-2xl`}></i>
            <div className='text-[18px] font-semibold'>{children}</div>
        </button>
  )
}
