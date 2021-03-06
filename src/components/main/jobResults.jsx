import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Select } from 'antd';
import { List, Icon } from 'antd';

const Option = Select.Option;

const IconText = ({ type, text }) => (
  <span>
    <Icon type="environment" theme="twoTone" twoToneColor="#56d48f" />
    {text}
  </span>
);


class JobResults extends Component {

  handleChange = (value) => {
    this.props.sortBy(value)
  }

  render() {
    return (
      <div className="component-job-results">
        <div className="job-results-top">
           
           {this.props.jobData.length > 0 ?
              <Fragment>
                <div className="countResults">RESULTS ({this.props.jobData.length})</div>
                <div className="sortBy">Sort by 
                <Select defaultValue="Relevance" style={{ width: 160 }} onChange={this.handleChange} >
                  <Option value="relevance">Relevance</Option>
                  <Option value="lowtohigh">Lowest Price</Option>
                  <Option value="hightolow">Highest Price</Option>
                </Select>
              </div>
            </Fragment>
            : <div className="noResults"><h4>SORRY...NO PROFILES FOUND</h4></div>
          }
          
        </div>
        {this.props.jobData.length > 0 ?
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: (page) => {
              //console.log(page);
            },
            pageSize: 4,
          }}
          dataSource={this.props.jobData}
          renderItem={item => (
            <List.Item
              key={item.title}
              extra={<span>${Math.round(item.salarymin/160)}/hr</span>}
            >
              <List.Item.Meta
                title={item.title}
                description={<span className={item.jobType === 'Part Time'?'availability green':'availability blue'}>{item.jobType}</span>}
              />
              <div className="location">
              {[<IconText key={Math.random()} type="environment" theme="twoTone" text={item.location} twoToneColor="#56d48f" />]}
              </div>
              <p className="info">{item.desciption}</p>
              <ul className="skills">
              {
                item.requiredSkills.split(",").map((skill, index) => {
                return (
                  <li key={index}>{skill}</li>
                );})
              }
              </ul>
            </List.Item>
          )}
        /> : <div /> }
      </div>
    );
  }
}
JobResults.propTypes = {
  jobData: PropTypes.array
};
export default JobResults;
