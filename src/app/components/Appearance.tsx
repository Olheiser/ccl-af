import styles from "@/styles/Appearance.module.css";
import Image from "next/image";
import HandIcon from "../../../public/grab.webp"
import EmailIcon from "../../../public/email.webp"


export default function Appearance() {
    return (
        <div className={styles.appearanceWrapper}>
            <div className={styles.appearanceText}>Jaggi needs an agent for January 3rd in Estevan PC at 10AM</div>
            <div className={styles.appearanceIcons}>
                <Image 
                    width={20} 
                    height={20}
                    src={HandIcon}
                    alt="Claim this appearance"   
                />
                <Image 
                    width={20} 
                    height={20}
                    src={EmailIcon}
                    alt="Email counsel about this appearance"  
                />
            </div>
        </div>
    )
}