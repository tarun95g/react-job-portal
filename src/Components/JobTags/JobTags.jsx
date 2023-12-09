import React from 'react';
import { Space, Tag } from 'antd';
import {
  EnvironmentOutlined, 
  DollarOutlined, 
  BulbOutlined
} from '@ant-design/icons';


const mapper= {
  'experience' : {
    icon: <BulbOutlined />, 
    color: "#55acee"
  },
  'location' : {
    icon: <EnvironmentOutlined />, 
    color: "#cd201f"
  },
  'salary' : {
    icon: <DollarOutlined />, 
    color: "#3b5999"
  }
}

const JobTags = ({jobId, tags = []}) => (
  <Space size={[0, 8]} wrap>
    {
      tags.map(item => (
        <Tag key={`${jobId}${item.type}`} icon={ mapper[item.type]?.icon} color={mapper[item.type]?.color ||  "#3b5999"}>
          {item.label}
      </Tag>
      ) )
    }
</Space>
);

JobTags.propTypes = {
  // bla: PropTypes.string,
};

JobTags.defaultProps = {
  // bla: 'test',
};

export default JobTags;
