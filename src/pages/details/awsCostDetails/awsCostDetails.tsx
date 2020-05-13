import { getQuery, OcpQuery, parseQuery } from 'api/queries/ocpQuery';
import { Query } from 'api/queries/query';
import { Report, ReportPathsType, ReportType } from 'api/reports/report';
import { AxiosError } from 'axios';
import CostDetailsBase from 'pages/details/components/costDetails/costDetailsBase';
import React from 'react';
import { InjectedTranslateProps, translate } from 'react-i18next';
import { connect } from 'react-redux';
import { createMapStateToProps, FetchStatus } from 'store/common';
import { reportActions, reportSelectors } from 'store/reports';
// import { CostOverview } from './costOverview';
import { HistoricalData } from './historicalData';

type AwsCostDetailsOwnProps = InjectedTranslateProps;

interface AwsCostDetailsStateProps {
  CostOverview?: React.ReactNode;
  detailsURL: string;
  HistoricalData?: React.ReactNode;
  query: Query;
  queryString: string;
  report: Report;
  reportError: AxiosError;
  reportFetchStatus: FetchStatus;
  reportType: ReportType;
  reportPathsType: ReportPathsType;
}

interface CostDetailsDispatchProps {
  fetchReport?: typeof reportActions.fetchReport;
}

const detailsURL = '/details/aws';
const reportType = ReportType.cost;
const reportPathsType = ReportPathsType.aws;

const mapStateToProps = createMapStateToProps<
  AwsCostDetailsOwnProps,
  AwsCostDetailsStateProps
>(state => {
  const queryFromRoute = parseQuery<OcpQuery>(location.search);
  const query = queryFromRoute;
  const queryString = getQuery(query);
  const report = reportSelectors.selectReport(
    state,
    reportPathsType,
    reportType,
    queryString
  );
  const reportError = reportSelectors.selectReportError(
    state,
    reportPathsType,
    reportType,
    queryString
  );
  const reportFetchStatus = reportSelectors.selectReportFetchStatus(
    state,
    reportPathsType,
    reportType,
    queryString
  );

  return {
    // CostOverview: <CostOverview />,
    detailsURL,
    HistoricalData: <HistoricalData />,
    query,
    queryString,
    report,
    reportError,
    reportFetchStatus,
    reportType,
    reportPathsType,
  };
});

const mapDispatchToProps: CostDetailsDispatchProps = {
  fetchReport: reportActions.fetchReport,
};

const AwsCostDetails = translate()(
  connect(mapStateToProps, mapDispatchToProps)(CostDetailsBase)
);

export default AwsCostDetails;