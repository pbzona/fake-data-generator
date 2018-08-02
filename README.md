# Fake Data Generator

This is a set of Node.js scripts that generates fake data. Fake data, in this context, means pseudorandom sets of information that can be used for a demo or another situation where you want to show a specific concept without resorting to lorem ipsum or other placeholder text.

Currently, the scope is limited to generating predefined sets of data. If you want to customize something, you'll need to edit the code. Planning to make this a library at some point.

## Reference

I'll continue to update this as I add new features, but for now, here are the types of fake data these scripts will generate.

### Customer Data

This generates a tab-separated-value file containing a row of headings commonly seen in a list of customer information, including personally identifiable, sensitive information, along with 300 datapoints each in a new line.

### AWS Access Logs

This generates a file based on the format of AWS Elastic Load Balancer access logs (HTTPS requests). Set to generate 300 data points, but this is easily adjustable within the script.

### Medical History Forms

This generates a PDF file containing sensitive "medical histories" including medication history, surgical procedures, major illnesses and vaccination records.

## Future Plans

Make it into a proper library that can be used to generate this data without having to choose a script. New data types are being added as I have a need for them. There's no set plan for new types.
