import { ForecastPathsType, ForecastType } from 'api/forecasts/forecast';
import { ReportPathsType, ReportType } from 'api/reports/report';
import {
  ChartType,
  ComputedForecastItemType,
  ComputedReportItemType,
  ComputedReportItemValueType,
} from 'components/charts/common/chartDatumUtils';
import { paths } from 'routes';
import { DashboardChartType } from 'store/dashboard/common/dashboardCommon';

import { IbmDashboardTab, IbmDashboardWidget } from './ibmDashboardCommon';

let currrentId = 0;
const getId = () => currrentId++;

export const computeWidget: IbmDashboardWidget = {
  id: getId(),
  titleKey: 'ibm_dashboard.compute_title',
  forecastPathsType: ForecastPathsType.ibm,
  reportPathsType: ReportPathsType.ibm,
  reportType: ReportType.instanceType,
  details: {
    costKey: 'cost',
    formatOptions: {
      fractionDigits: 2,
    },
    showUnits: true,
    showUsageFirst: true,
    showUsageLegendLabel: true,
    usageFormatOptions: {
      fractionDigits: 0,
    },
    usageKey: 'dashboard.usage',
  },
  filter: {
    service: 'Compute Engine',
  },
  tabsFilter: {
    service: 'Compute Engine',
  },
  trend: {
    computedReportItem: ComputedReportItemType.usage,
    computedReportItemValue: ComputedReportItemValueType.total,
    formatOptions: {
      fractionDigits: 2,
    },
    titleKey: 'dashboard.daily_usage_comparison',
    type: ChartType.daily,
  },
  topItems: {
    formatOptions: {},
  },
  // availableTabs: [
  //   IbmDashboardTab.instanceType,
  //   IbmDashboardTab.accounts,
  //   IbmDashboardTab.regions,
  // ],
  chartType: DashboardChartType.trend,
  currentTab: IbmDashboardTab.instanceType,
};

export const costSummaryWidget: IbmDashboardWidget = {
  id: getId(),
  titleKey: 'ibm_dashboard.cost_title',
  forecastPathsType: ForecastPathsType.ibm,
  forecastType: ForecastType.cost,
  reportPathsType: ReportPathsType.ibm,
  reportType: ReportType.cost,
  details: {
    adjustContainerHeight: true,
    costKey: 'cost',
    formatOptions: {
      fractionDigits: 2,
    },
    showHorizontal: true,
    viewAllPath: paths.ibmDetails,
  },
  tabsFilter: {
    limit: 3,
  },
  trend: {
    computedForecastItem: ComputedForecastItemType.cost,
    computedReportItem: ComputedReportItemType.cost,
    computedReportItemValue: ComputedReportItemValueType.total,
    formatOptions: {},
    dailyTitleKey: 'ibm_dashboard.daily_cost_trend_title',
    titleKey: 'ibm_dashboard.cost_trend_title',
    type: ChartType.rolling,
  },
  topItems: {
    formatOptions: {},
  },
  availableTabs: [IbmDashboardTab.services, IbmDashboardTab.projects, IbmDashboardTab.regions],
  chartType: DashboardChartType.dailyTrend,
  currentTab: IbmDashboardTab.services,
};

export const databaseWidget: IbmDashboardWidget = {
  id: getId(),
  titleKey: 'dashboard.database_title',
  reportPathsType: ReportPathsType.ibm,
  reportType: ReportType.database,
  details: {
    costKey: 'cost',
    formatOptions: {
      fractionDigits: 2,
    },
    showUnits: true,
  },
  filter: {
    service: 'Bigtable,Datastore,Database Migrations,Firestore,MemoryStore,Spanner,SQL',
  },
  tabsFilter: {
    service: 'Bigtable,Datastore,Database Migrations,Firestore,MemoryStore,Spanner,SQL',
  },
  trend: {
    computedReportItem: ComputedReportItemType.cost,
    computedReportItemValue: ComputedReportItemValueType.total,
    formatOptions: {},
    titleKey: 'dashboard.cumulative_cost_comparison',
    type: ChartType.rolling,
  },
  topItems: {
    formatOptions: {},
  },
  // availableTabs: [
  //   IbmDashboardTab.services,
  //   IbmDashboardTab.accounts,
  //   IbmDashboardTab.regions,
  // ],
  chartType: DashboardChartType.trend,
  currentTab: IbmDashboardTab.services,
};

export const networkWidget: IbmDashboardWidget = {
  id: getId(),
  titleKey: 'dashboard.network_title',
  reportPathsType: ReportPathsType.ibm,
  reportType: ReportType.network,
  details: {
    costKey: 'cost',
    formatOptions: {
      fractionDigits: 2,
    },
    showUnits: true,
  },
  filter: {
    service:
      'VPC network,Network services,Hybrid Connectivity,Network Service Tiers,Network Security,Network Intelligence',
  },
  tabsFilter: {
    service:
      'VPC network,Network services,Hybrid Connectivity,Network Service Tiers,Network Security,Network Intelligence',
  },
  trend: {
    computedReportItem: ComputedReportItemType.cost,
    computedReportItemValue: ComputedReportItemValueType.total,
    formatOptions: {},
    titleKey: 'dashboard.cumulative_cost_comparison',
    type: ChartType.rolling,
  },
  topItems: {
    formatOptions: {},
  },
  // availableTabs: [
  //   IbmDashboardTab.services,
  //   IbmDashboardTab.accounts,
  //   IbmDashboardTab.regions,
  // ],
  chartType: DashboardChartType.trend,
  currentTab: IbmDashboardTab.services,
};

export const storageWidget: IbmDashboardWidget = {
  id: getId(),
  titleKey: 'dashboard.storage_title',
  reportPathsType: ReportPathsType.ibm,
  reportType: ReportType.storage,
  details: {
    costKey: 'cost',
    formatOptions: {
      fractionDigits: 2,
    },
    showUnits: true,
    showUsageFirst: true,
    showUsageLegendLabel: true,
    usageFormatOptions: {
      fractionDigits: 0,
    },
    usageKey: 'dashboard.usage',
  },
  trend: {
    computedReportItem: ComputedReportItemType.usage,
    computedReportItemValue: ComputedReportItemValueType.total,
    formatOptions: {
      fractionDigits: 2,
    },
    titleKey: 'dashboard.daily_usage_comparison',
    type: ChartType.daily,
  },
  topItems: {
    formatOptions: {},
  },
  // availableTabs: [
  //   IbmDashboardTab.services,
  //   IbmDashboardTab.accounts,
  //   IbmDashboardTab.regions,
  // ],
  chartType: DashboardChartType.trend,
  currentTab: IbmDashboardTab.projects,
};
