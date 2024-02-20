import { useContext, useState, Fragment } from 'react';
import VModal from '../../VModal';
import { ClassContext } from '../../../contexts/class';

function ImportExportModal({ open, setOpen }) {
  const { cls, setCls, assignmentTypes, setAssignmentTypes } = useContext(ClassContext);
  const [importing, setImporting] = useState(true);
  const [importStr, setImportStr] = useState('');
  const [importErr, setImportErr] = useState('');
  const [exportErr, setExportErr] = useState('');
  const activeButtonClasses = 'bg-blue-700 hover:bg-blue-800 active:bg-blue-900';
  const inactiveButtonClasses = 'bg-gray-700 hover:bg-gray-800 active:bg-gray-900';

  const handleImportChange = (e) => {
    setImportStr(e.target.value);
  };

  const importClass = () => {
    try {
      const imported = JSON.parse(importStr);
      setCls(imported);
      const assignmentTypes = imported.assignment_types.reduce((acc, obj) => {
        acc[obj.id] = { ...obj };
        return acc;
      }, {});
      setAssignmentTypes(assignmentTypes);
      setOpen(false);
      setImportStr('');
    } catch (err) {
      console.error(err);
      setImportErr('Invalid JSON Provided');
    }
  };

  const downloadClsJSON = () => {
    if (!cls.code) {
      setExportErr('Cannot download JSON for an empty class');
    } else {
      const jsonStr = getClsJSON();
      const filename = `${cls.code}-${cls.title}.json`;
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = filename;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const getClsJSON = () => {
    const assignmentTypesArr = Object.values(assignmentTypes);
    return JSON.stringify({ ...cls, assignment_types: assignmentTypesArr });
  };

  return (
    <VModal
      show={open}
      onHide={() => setOpen(false)}
      dialogClassName="custom-modal"
      header={'Import / Export'}
      body={
        <div className="flex flex-col gap-8 h-full">
          <div className="flex gap-16 justify-center">
            <div className="flex flex-col gap-2 justify-center items-center">
              <button
                className={`text-white border-[1px] border-black py-2 px-2 rounded-lg ${
                  importing ? activeButtonClasses : inactiveButtonClasses
                }`}
                onClick={() => setImporting(true)}
              >
                Import
              </button>
            </div>
            <div className="flex flex-col gap-2 justify-center items-center">
              <button
                className={`text-white border-[1px] border-black py-2 px-2 rounded-lg ${
                  importing ? inactiveButtonClasses : activeButtonClasses
                }`}
                onClick={() => setImporting(false)}
              >
                Export
              </button>
            </div>
          </div>
          <div className="w-full h-full flex flex-col justify-center text-center items-center">
            {importing && (
              <Fragment>
                <label className="text-lg pb-4">
                  Class JSON:{' '}
                  <span className="text-sm">
                    (JSON must be from the export feature)(Imported classes will not persist)
                  </span>
                </label>
                {importErr && <p className="font-bold text-red-600 text-lg my-1">{importErr}</p>}
                <textarea
                  className="border-[1px] border-black text-start resize-y overflow-y-auto p-2 w-full overflow-scroll h-[250px]"
                  name="imported"
                  value={importStr}
                  onChange={handleImportChange}
                />
                <button
                  className="text-white border-[1px] border-black py-2 px-2 rounded-lg bg-green-700 hover:bg-green-800 active:bg-green-900 w-48 my-2"
                  onClick={importClass}
                >
                  Submit
                </button>
              </Fragment>
            )}
            {!importing && (
              <Fragment>
                {exportErr && <p className="font-bold text-red-600 text-lg my-1">{exportErr}</p>}
                <button
                  className="text-white border-[1px] border-black py-2 px-2 rounded-lg bg-gray-700 hover:bg-gray-800 active:bg-gray-900 w-48"
                  onClick={downloadClsJSON}
                >
                  Download JSON File
                </button>
                <h1 className="text-lg mt-4">
                  JSON String: <span className="text-sm">(Can be pasted in the import form to import a class)</span>
                </h1>
                <p className="my-2 border-2 border-black p-2 h-[250px] w-full overflow-scroll select-all">
                  {cls.code && getClsJSON()}
                </p>
              </Fragment>
            )}
          </div>
        </div>
      }
    />
  );
}

export default ImportExportModal;
