import React, { FunctionComponent } from "react";
import styles from "../../styles/DetailAccount.module.scss";
interface DetailAccountProps {
  accountId: string;
  balanceOf: string;
}

export const DetailAccount: FunctionComponent<DetailAccountProps> = ({
  accountId,
  balanceOf,
}) => {
  return (
    <div className={styles.detailAccount}>
      <div>Account Id : {accountId || ''}</div>
      <div>Balance of : {balanceOf}</div>
    </div>
  );
};
