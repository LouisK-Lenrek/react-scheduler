import React, {type ReactElement, useCallback, useMemo, useState } from "react";
import dayjs from "dayjs";
import { createMockData } from "./mock/appMock";
import { ParsedDatesRange } from "./utils/getDatesRange";
import { ConfigFormValues, SchedulerProjectData } from "./types/global";
import ConfigPanel from "./components/ConfigPanel";
import { StyledSchedulerFrame } from "./styles";
import { Scheduler } from ".";
import { ReactAdapterElement, type RenderHooks } from "Frontend/generated/flow/ReactAdapter";

const handleFilterData = () => console.log(`Filters button was clicked.`);

const handleTileClick = (data: SchedulerProjectData) =>
  console.log(
    `Item ${data.title} - ${data.subtitle} was clicked. \n==============\nStart date: ${data.startDate} \n==============\nEnd date: ${data.endDate}\n==============\nOccupancy: ${data.occupancy}`
  );

class App extends ReactAdapterElement {

	protected override render(hooks: RenderHooks): ReactElement | null {
		const [values, setValues] = hooks.useState<ConfigFormValues>("values",{
			peopleCount: 15,
			projectsPerYear: 60,
			yearsCovered: 0,
			startDate: undefined,
			maxRecordsPerPage: 5,
			isFullscreen: true
		});

		const { peopleCount, projectsPerYear, yearsCovered, isFullscreen, maxRecordsPerPage } = values;

		const mocked = useMemo(
			() => createMockData(+peopleCount, +yearsCovered, +projectsPerYear),
			[peopleCount, projectsPerYear, yearsCovered]
		);

		const [range, setRange] = hooks.useState<ParsedDatesRange>("range",{
			startDate: new Date(),
			endDate: new Date()
		});

		const handleRangeChange = useCallback((range: ParsedDatesRange) => {
			setRange(range);
		}, []);

		const filteredData = useMemo(
			() =>
				mocked.map((person) => ({
					...person,
					data: person.data.filter(
						(project) =>
							dayjs(project.startDate).isBetween(range.startDate, range.endDate) ||
							dayjs(project.endDate).isBetween(range.startDate, range.endDate) ||
							(dayjs(project.startDate).isBefore(range.startDate, "day") &&
								dayjs(project.endDate).isAfter(range.endDate, "day"))
					)
				})),
			[mocked, range.endDate, range.startDate]
		);

		return (
			<>
				<ConfigPanel values={values} onSubmit={setValues} />
				{isFullscreen ? (
					<Scheduler
						startDate={values.startDate ? new Date(values.startDate).toISOString() : undefined}
						onRangeChange={handleRangeChange}
						data={filteredData}
						isLoading={false}
						onTileClick={handleTileClick}
						onFilterData={handleFilterData}
						config={{ zoom: 1, maxRecordsPerPage: maxRecordsPerPage, showThemeToggle: true, lang: "fr" }}
						onItemClick={(data) => console.log("clicked: ", data)}
					/>
				) : (
					<StyledSchedulerFrame>
						<Scheduler
							startDate={values.startDate ? new Date(values.startDate).toISOString() : undefined}
							onRangeChange={handleRangeChange}
							isLoading={false}
							data={filteredData}
							onTileClick={handleTileClick}
							onFilterData={handleFilterData}
							onItemClick={(data) => console.log("clicked: ", data)}
						/>
					</StyledSchedulerFrame>
				)}
			</>
		);
	}
}

customElements.define("react-test-component", App);