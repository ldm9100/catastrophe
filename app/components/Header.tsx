'use client'

interface HeaderProps {
    title: string
}

export const Header = ({ title }: HeaderProps) => {
    return <div className={"w-full max-w-md"} style={{
        top: 0,
        position: 'absolute',
        zIndex: 1,
        background: '#578FCA',
        height: 60,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    }}>
        <p className={'text-white'}>{title}</p>
    </div>
}
