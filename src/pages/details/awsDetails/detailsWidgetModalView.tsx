import { Title } from '@patternfly/react-core';
import { AwsQuery, getQuery } from 'api/queries/awsQuery';
import { AwsReport } from 'api/reports/awsReports';
import { ReportType } from 'api/reports/report';
import {
  ReportSummaryItem,
  ReportSummaryItems,
} from 'components/reports/reportSummary';
import React from 'react';
import { InjectedTranslateProps, translate } from 'react-i18next';
import { connect } from 'react-redux';
import { createMapStateToProps, FetchStatus } from 'store/common';
import {
  awsReportsActions,
  awsReportsSelectors,
} from 'store/reports/awsReports';
import { ComputedReportItem } from 'utils/computedReport/getComputedReportItems';
import { formatValue } from 'utils/formatValue';
import { formatCurrency } from 'utils/formatValue';
import { styles } from './detailsWidgetModal.styles';

interface DetailsWidgetModalViewOwnProps {
  groupBy: string;
  item: ComputedReportItem;
  parentGroupBy: string;
}

interface DetailsWidgetModalViewStateProps {
  queryString?: string;
  report?: AwsReport;
  reportFetchStatus?: FetchStatus;
}

interface DetailsWidgetModalViewDispatchProps {
  fetchReport?: typeof awsReportsActions.fetchReport;
}

type DetailsWidgetModalViewProps = DetailsWidgetModalViewOwnProps &
  DetailsWidgetModalViewStateProps &
  DetailsWidgetModalViewDispatchProps &
  InjectedTranslateProps;

const reportType = ReportType.cost;

class DetailsWidgetModalViewBase extends React.Component<
  DetailsWidgetModalViewProps
> {
  constructor(props: DetailsWidgetModalViewProps) {
    super(props);
  }

  public componentDidMount() {
    const { fetchReport, queryString } = this.props;
    fetchReport(reportType, queryString);
  }

  public componentDidUpdate(prevProps: DetailsWidgetModalViewProps) {
    const { fetchReport, queryString } = this.props;
    if (prevProps.queryString !== queryString) {
      fetchReport(reportType, queryString);
    }
  }

  public render() {
    const { groupBy, report, reportFetchStatus, t } = this.props;

    const cost = formatCurrency(
      report && report.meta && report.meta.total
        ? report.meta.total.cost.value
        : 0
    );

    return (
      <>
        <div className={styles.subTitle}>
          <Title size="lg">
            {t('aws_details.cost_value', { value: cost })}
          </Title>
        </div>
        <div className={styles.mainContent}>
          <ReportSummaryItems
            idKey={groupBy as any}
            report={report}
            status={reportFetchStatus}
          >
            {({ items }) =>
              items.map(_item => (
                <ReportSummaryItem
                  key={_item.id}
                  formatOptions={{}}
                  formatValue={formatValue}
                  label={_item.label ? _item.label.toString() : ''}
                  totalValue={report.meta.total.cost.value}
                  units={_item.units}
                  value={_item.cost}
                />
              ))
            }
          </ReportSummaryItems>
        </div>
      </>
    );
  }
}

const mapStateToProps = createMapStateToProps<
  DetailsWidgetModalViewOwnProps,
  DetailsWidgetModalViewStateProps
>((state, { groupBy, item, parentGroupBy }) => {
  const query: AwsQuery = {
    filter: {
      time_scope_units: 'month',
      time_scope_value: -1,
      resolution: 'monthly',
      [parentGroupBy]: item.label || item.id,
    },
    group_by: { [groupBy]: '*' },
  };
  const queryString = getQuery(query);
  const report = awsReportsSelectors.selectReport(
    state,
    reportType,
    queryString
  );
  const reportFetchStatus = awsReportsSelectors.selectReportFetchStatus(
    state,
    reportType,
    queryString
  );
  return {
    queryString,
    report,
    reportFetchStatus,
  };
});

const mapDispatchToProps: DetailsWidgetModalViewDispatchProps = {
  fetchReport: awsReportsActions.fetchReport,
};

const DetailsWidgetModalView = translate()(
  connect(mapStateToProps, mapDispatchToProps)(DetailsWidgetModalViewBase)
);

export { DetailsWidgetModalView, DetailsWidgetModalViewProps };
