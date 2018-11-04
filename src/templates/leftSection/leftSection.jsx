import React, { Component } from 'react';
import { Layout,Divider,Input } from 'antd';
import Availability from './availabilityComponent.jsx';
import ComboBox from '../common/comboBox.jsx';
import SliderComponent from './sliderComponent.jsx';

export default class LeftSection extends Component{
	render(){
		const jobtypeProps=['Reactjs FrontEnd Engineer','Front End Engineer','FrontEnd consultant','React Engineer', 'Java Engineer', 'Full stack Engineer', 'Data Engineer', 'DB Admin'];
		const skillsProps = ["npm","react","webpack","html","js","css","java", "spring", "kafka", "nginx", "scala", "hadoop", "spark", "oracle", "mysql"];
		const experienceProps=['Reactjs FrontEnd Engineer','Front End Engineer','FrontEnd consultant','React Engineer', 'Java Engineer', 'Full stack Engineer', 'Data Engineer', 'DB Admin'];
		const languageProps=['English','Spanish','France','Chinese','Korean']

		return(
			<Layout>
				<p><b>FILTERS</b> <span className='clearFilter'>Clear all filters</span></p>
				<Divider />
				<ComboBox skillsEvent={this.props.skillsFilter} mode="multiple" optionProps={skillsProps} title="Skills" placeholderProps="Select your skills" />
				<Availability availabilityEvent={this.props.availabilityFilter} />
				<ComboBox jobTypeEvent={this.props.jobTypeFilter} mode="multiple" optionProps={jobtypeProps} title="Job type" placeholderProps="Select a job type" />
				<SliderComponent rangeEvent1={this.props.rangeFilter1} rangeEvent2={this.props.rangeFilter2}/>
				<ComboBox experienceEvent={this.props.experienceFilter} mode="multiple" optionProps={experienceProps} title="Experience" placeholderProps="Select your experience level" />
				<div className="container">
					<p><b>Countries</b> <span className='clearFilter'>Clear</span></p>
					<Input placeholder="Enter State, Province or country" />
				</div>
				<ComboBox mode="default" optionProps={languageProps} title="Languages" placeholderProps="Select your language" />
			</Layout>
		);
	}
}