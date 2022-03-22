import { stats } from '../../../utils/enums';
import styles from './stats.module.scss';

export interface StatsProps {
    data?: any
}

export const Stats = (props: StatsProps) => {
    const {data} = props;
    return (
        <div className={`${styles.stats_container}`}>
            {/* {props.data.map(
                (st)=>{
                    return (<p>{st.stat.name}</p>)
                }
            )} */}
            <span>
                <p>{(stats as any)[data[0].stat.name]} - {data[0].base_stat}</p>
                <p>{(stats as any)[data[1].stat.name]} - {data[1].base_stat}</p>
                <p>{(stats as any)[data[2].stat.name]} - {data[2].base_stat}</p>
            </span>
            <span>
                
                
            </span>
            <span>
                <p>{(stats as any)[data[3].stat.name]} - {data[3].base_stat}</p>
                <p>{(stats as any)[data[4].stat.name]} - {data[4].base_stat}</p>
                <p>{(stats as any)[data[5].stat.name]} - {data[5].base_stat}</p>
            </span>
        </div>
    )
}