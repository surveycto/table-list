# table-list
This will provide a table view to select_one and select_multiple fields.

![table-list field plug-in](extras/table-list.jpg)

## Description

This field plug-in allows for data to presented in the form of a table. The data can be pulled in from a static choices, pre-loaded from a CSV file or from an attached dataset. The table further allows for sorting for each column and also searching for across the table.   See the [Parameters section](#parameters) below.

[![Download now](extras/download-button.png)](https://github.com/surveycto/table-list/raw/master/table-list.fieldplugin.zip)

## Default SurveyCTO feature support

| Feature / Property | Support |
| --- | --- |
| Supported field type(s) | `select_one` `select_multiple`|
| Default values | No |
| Custom constraint message | Yes |
| Custom required message | Yes |
| Read only | No |

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
| `delimiter` | Used to set the delimiter used in the choice label column (or column of csv or dataset). |
| `headers` | A comma separated list of table headers. The number of these should match the expected number of columns in the choice label column (or column of csv or dataset) |

**Example:**  
If you have an appearance of `custom-table-list(delimiter="|", headers = "ID, Name, Phone Number")`
This will be expected to have choices sheet with the following if using static choices;

| **list_name**| **value** | **label** |
| --- | ---| --- |
|client_information|client_information|id &#124; name &#124; phone_number|

You can read more about how to use this plugin [here] and see examples [here].

## More resources

* **Test form**  
You can find a form definition in this repo here: [extras/sample_form](https://github.com/surveycto/get_ip_address/tree/master/extras/sample_form).

* **Developer documentation**  
More instructions for developing and using field plug-ins can be found here: [https://github.com/surveycto/Field-plug-in-resources](https://github.com/surveycto/Field-plug-in-resources)
