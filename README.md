# Table list

![table-list field plug-in](extras/table-list.jpg)

## Description

This field plug-in allows for choice lists to be presented in the form of a table. The table can be created from correctly formatted static or [pre-loaded choices](https://docs.surveycto.com/02-designing-forms/04-sample-forms/12.search-and-select.html). The table further allows for sorting for each column and also searching for across the table.   See the [Parameters section](#parameters) below.

[![Download now](extras/download-button.png)](https://github.com/surveycto/table-list/raw/master/table-list.fieldplugin.zip)

## Default SurveyCTO feature support

| Feature / Property | Support |
| --- | --- |
| Supported field type(s) | `select_one` `select_multiple`|
| Default values | No |
| Custom constraint message | Yes |
| Custom required message | Yes |
| Read only | No |

Using multiple pre-load data columns as labels with the search() function is also not supported. Instead, you will store a delimited table in a single column of pre-load data. See below and the wiki for more

## How to use

**To use this field plug-in as-is**, just download the [table-list.fieldplugin.zip](https://github.com/surveycto/table-list/raw/master/table-list.fieldplugin.zip) file from this repo, and attach it to your form.

To create your own field plug-in using this as a template, follow these steps:

1. Fork this repo
1. Make changes to the files in the `source` directory.
    * **Note:** be sure to update the `manifest.json` file as well.
1. Zip the updated contents of the `source` directory.
1. Rename the .zip file to *yourpluginname*.fieldplugin.zip (replace *yourpluginname* with the name you want to use for your field plug-in).
1. You may then attach your new .fieldplugin.zip file to your form as normal.

## Parameters

| **Key** | **Value** |
| --- | --- |
| `delimiter` | Used to set the delimiter used in the choice label column (or column of pre-loaded data that contains the table). |
| `headers` | A comma separated list of table headers. The number of these should match the expected number of columns in the choice label column (or column of csv or dataset) |

> **Example:**  
> If you have an appearance of `custom-table-list(delimiter="|", headers = "ID, Name, Phone Number")`
> the corresponding choice list could look like this:

| **list_name**| **value** | **label** |
| --- | ---| --- |
|client_information|client_information|id &#124; name &#124; phone_number|

You can read more about how to use this plugin [here] and see examples [here].

## More resources

* **Test form**  
You can find a form definition in this repo here: [extras/sample_form](https://github.com/surveycto/get_ip_address/tree/master/extras/sample_form).

* **Developer documentation**  
More instructions for developing and using field plug-ins can be found here: [https://github.com/surveycto/Field-plug-in-resources](https://github.com/surveycto/Field-plug-in-resources)
