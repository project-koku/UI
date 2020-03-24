import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Grid,
  GridItem,
  Title,
} from '@patternfly/react-core';
import { css } from '@patternfly/react-styles';
import {
  Skeleton,
  SkeletonSize,
} from '@redhat-cloud-services/frontend-components/components/Skeleton';
import React from 'react';
import { InjectedTranslateProps, translate } from 'react-i18next';
import { FetchStatus } from 'store/common';
import { styles } from './ocpCloudReportSummaryAlt.styles';

interface OcpCloudReportSummaryAltProps extends InjectedTranslateProps {
  children?: React.ReactNode;
  detailsLink?: React.ReactNode;
  status: number;
  subTitle?: string;
  tabs?: React.ReactNode;
  title: string;
}

const OcpCloudReportSummaryAltBase: React.SFC<OcpCloudReportSummaryAltProps> = ({
  children,
  detailsLink,
  status,
  subTitle,
  t,
  tabs,
  title,
}) => (
  <Card style={styles.reportSummary}>
    <Grid gutter="md">
      <GridItem lg={5} xl={6}>
        <div style={styles.cost}>
          <CardHeader>
            <Title size="lg">{title}</Title>
            {Boolean(subTitle) && <p style={styles.subtitle}>{subTitle}</p>}
          </CardHeader>
          <CardBody>
            {status === FetchStatus.inProgress ? (
              <>
                <Skeleton size={SkeletonSize.xs} />
                <Skeleton style={styles.chartSkeleton} size={SkeletonSize.md} />
                <Skeleton size={SkeletonSize.sm} />
                <Skeleton
                  style={styles.legendSkeleton}
                  size={SkeletonSize.xs}
                />
              </>
            ) : (
              children
            )}
          </CardBody>
        </div>
      </GridItem>
      <GridItem lg={7} xl={6}>
        <div style={styles.container}>
          <div style={styles.tops}>
            {status !== FetchStatus.inProgress && (
              <>
                {Boolean(tabs) && <CardBody>{tabs}</CardBody>}
                {Boolean(detailsLink) && <CardFooter>{detailsLink}</CardFooter>}
              </>
            )}
          </div>
        </div>
      </GridItem>
    </Grid>
  </Card>
);

const OcpCloudReportSummaryAlt = translate()(OcpCloudReportSummaryAltBase);

export { OcpCloudReportSummaryAlt, OcpCloudReportSummaryAltProps };
