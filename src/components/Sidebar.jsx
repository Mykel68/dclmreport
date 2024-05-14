import Link from "next/link";
import { FiHome, FiSettings, FiUsers, FiLogOut } from "react-icons/fi";
import styles from "@/components/Sidebar.module.css";
import Image from "next/image";
import Logo from "@/assets/dlbc.png";

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebar_header}>
        <Image src={Logo} alt="logo" className=" w-1/6  mb-3 " />
        <h2 className="text-xl font-semibold  ">DCLM Report</h2>
      </div>
      <ul className={`${styles.sidebar_menu}   `}>
        <li>
          <Link href="/admin">
            <FiHome />
            Home
          </Link>
        </li>
        <li>
          <Link href="/admin/report">
            <FiUsers />
            Report
          </Link>
        </li>
        <li>
          <Link href="/settings">
            <FiSettings />
            Settings
          </Link>
        </li>
        {/* <li>
          <Link href="/logout">
            <FiLogOut />
            Logout
          </Link>
        </li> */}
      </ul>
      <div className={styles.sidebar_footer}>
        <FiLogOut />
        <Link href="/logout">Logout</Link>
      </div>
    </div>
  );
};

export default Sidebar;
