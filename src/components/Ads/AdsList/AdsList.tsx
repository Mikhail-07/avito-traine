import React from 'react';
import { Button } from 'antd';
import { Advertisment } from '@api/types';
import { AdCard, LoadingWrapper } from '@components/index';
import styles from './AdsList.module.less'

interface AdsListProps {
  ads: Advertisment[];
  loading: boolean;
  error: string | null;
  onCreateNewAd?: () => void;
}

const AdsList: React.FC<AdsListProps> = ({ ads, loading, error, onCreateNewAd }) => {
  return (
    <LoadingWrapper
      data={ads}
      loading={loading}
      error={error}
      onReload={() => window.location.reload()}
      emptyDescription={
        <>
          <p>Объявления не найдены.</p>
          {onCreateNewAd && (
            <Button type="primary" size="large" onClick={onCreateNewAd}>
              Создать свое первое объявление
            </Button>
          )}
        </>
      }
    >
      <div className={styles.adsListContainer}>
        {ads.map(ad => (
          <div key={ad.id} className={styles.adCardWrapper}>
            <AdCard ad={ad} />
          </div>
        ))}
      </div>
    </LoadingWrapper>
  );
};

export default AdsList;
