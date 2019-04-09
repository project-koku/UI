import { Tooltip } from '@patternfly/react-core';
import { css } from '@patternfly/react-styles';
import { OcpReport, OcpReportType } from 'api/ocpReports';
import React from 'react';
import { InjectedTranslateProps, translate } from 'react-i18next';
import { FormatOptions, ValueFormatter } from 'utils/formatValue';
import { styles } from './ocpReportSummaryDetails.styles';

interface OcpReportSummaryDetailsProps extends InjectedTranslateProps {
  formatValue?: ValueFormatter;
  formatOptions?: FormatOptions;
  report: OcpReport;
  reportType?: OcpReportType;
  requestLabel?: string;
  usageLabel?: string;
}

const OcpReportSummaryDetailsBase: React.SFC<OcpReportSummaryDetailsProps> = ({
  formatValue,
  formatOptions,
  report,
  reportType = OcpReportType.cost,
  requestLabel,
  usageLabel,
  t,
}) => {
  let cost: string | number = '----';
  let derivedCost: string | number = '----';
  let infrastructureCost: string | number = '----';
  let requestValue: string | number = '----';

  if (report && report.meta && report.meta.total) {
    cost = formatValue(
      report.meta.total.cost ? report.meta.total.cost.value : 0,
      report.meta.total.cost ? report.meta.total.cost.units : 'USD',
      formatOptions
    );
    derivedCost = formatValue(
      report.meta.total.derived_cost ? report.meta.total.derived_cost.value : 0,
      report.meta.total.derived_cost
        ? report.meta.total.derived_cost.units
        : 'USD',
      formatOptions
    );
    infrastructureCost = formatValue(
      report.meta.total.infrastructure_cost
        ? report.meta.total.infrastructure_cost.value
        : 0,
      report.meta.total.infrastructure_cost
        ? report.meta.total.infrastructure_cost.units
        : 'USD',
      formatOptions
    );
    if (reportType !== OcpReportType.cost) {
      requestValue = formatValue(
        report.meta.total.request ? report.meta.total.request.value : 0,
        report.meta.total.request ? report.meta.total.request.units : '',
        formatOptions
      );
    }
  }

  return (
    <>
      <div className={css(styles.titleContainer)}>
        <div className={css(styles.value, styles.usageValue)}>
          <Tooltip
            content={t('ocp_dashboard.total_cost_tooltip', {
              derivedCost,
              infrastructureCost,
            })}
            enableFlip
          >
            <div>{cost}</div>
          </Tooltip>
          <div className={css(styles.text)}>
            <div>{usageLabel}</div>
          </div>
        </div>
      </div>
      <div className={css(styles.titleContainer)}>
        {Boolean(reportType !== OcpReportType.cost) && (
          <div className={css(styles.value)}>
            {requestValue}
            <div className={css(styles.text)}>{requestLabel}</div>
          </div>
        )}
      </div>
    </>
  );
};

const OcpReportSummaryDetails = translate()(OcpReportSummaryDetailsBase);

export { OcpReportSummaryDetails, OcpReportSummaryDetailsProps };
