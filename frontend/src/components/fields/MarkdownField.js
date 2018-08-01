import ReactMarkdown from 'react-markdown';

import React from 'react';
import PropTypes from 'prop-types';

const MarkdownField = ({ source, record = {} }) => <ReactMarkdown source={record.content} />;

MarkdownField.propTypes = {
    label: PropTypes.string,
    record: PropTypes.object,
    source: PropTypes.string.isRequired,
};

export default MarkdownField;
