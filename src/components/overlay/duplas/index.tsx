import Background from './background'
import Layout from './layout'

interface IDuplasLayoutProps {
    active: any;
}

const DuplasLayout = (props: IDuplasLayoutProps) => {

    return(
        <>
            <Layout />
            <Background />
        </>
    )
}

export default DuplasLayout