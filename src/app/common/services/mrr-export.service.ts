import { switchMap } from 'rxjs/operators';
import { ISearchCriteria } from './../models/search/search-criteria.model';
import { Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { ILookupData, ISdaListView, IBaseLookUp, Status, ISdaListResult } from '@app/common/models';
import { Observable } from 'rxjs/Observable';
import { SdaService } from '@app/common/services/sda.service';
import * as constants from '@app/common/constants';
import * as _ from 'lodash';
import * as moment from 'moment-timezone';
import * as pdfMake from 'pdfmake/build/pdfmake';
import { TDocumentDefinitions, pdfMakeStatic } from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { AppStateService } from '@app/common/services/app-state.service';
import { AuthService } from '@app/common/services/auth.service';


//https://github.com/bpampuch/pdfmake/issues/948#issuecomment-293542550
//https://github.com/bpampuch/pdfmake/issues/948
//http://dataurl.net/#dataurlmaker
/*tslint:disable:max-line-length*/



@Injectable()
export class MrrExportService {
  pdf: pdfMakeStatic;
  CST = 'America/Chicago';
  isQCPersonnel = false;
  icon_check_empty = '';
  icon_circle_empty = '';
  icon_ok_squared = '';
  icon_dot_circled = '';
  new_line = '\n';
  constructor(private sdaService: SdaService, private authService: AuthService) {
    this.pdf = pdfMake;
    this.pdf.vfs = pdfFonts.pdfMake.vfs;
    this.pdf.vfs['Fontello.ttf'] = constants.FontelloTTF;
    this.pdf.fonts = {
      Roboto: {
        normal: 'Roboto-Regular.ttf',
        bold: 'Roboto-Medium.ttf',
        italics: 'Roboto-Italic.ttf',
        bolditalics: 'Roboto-MediumItalic.ttf'
      },
      Fontello: {
        normal: 'Fontello.ttf',
        bold: 'Fontello.ttf',
        italics: 'Fontello.ttf',
        bolditalics: 'Fontello.ttf'
      }
    };


    authService.hasAnyRole([authService.HSDA_End_Users,
    authService.Reliability_Analyst,
    authService.CPCP_Trained_Reviewing_Engineer,
    authService.Compliance_Engineer,
    authService.Compliance_Engineering_Analyst,
    authService.Compliance_Engineering_Manager
    ]).take(1).subscribe(u => this.isQCPersonnel = !u);
  }
  exportMrrPdf(criteria: ISearchCriteria, sdas: number[]): Observable<any> {

    const dd: TDocumentDefinitions = {
      info: {
        title: 'Major Repair Report',
        author: 'American Airlines',
        subject: 'MRR',
        keywords: 'SDA, HSDA, Defect'
      },
      // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
      pageMargins: [20, 80, 20, 35],
      pageSize: 'LETTER',

      header: {
        margin: [25, 25, 25, 25],
        columns: [
          {

            table: {
              widths: ['33%', '33%', '*'],

              body: [
                [
                  {
                    margin: [-590, 0, 0, 0],
                    alignment: 'left',
                    image: constants.AALogo,
                  },
                  { text: 'Major Repair Report', alignment: 'left', style: 'header' },
                  {}
                ]
              ]
            },
            layout: 'noBorders'
          }
        ]
      },
      footer: function (currentPage, pageCount) {
        return {
          margin: 8,
          columns: [
            {
              table: {
                widths: ['15%', '60%', '25%'],

                body: [
                  [
                    { text: `Page ${currentPage} of ${pageCount}`, fontSize: 6, },

                    { fontSize: 6, text: '', alignment: 'left' },
                    { fontSize: 6, text: '', alignment: 'right' }
                  ]
                ]
              },
              layout: 'noBorders'
            }
          ]
        };
      },
      content: [],
      styles: {
        header: {
          fontSize: 18,
          bold: false,

        },
        subheader: {
          fontSize: 7,
          bold: true,

        },
        sectionHeader: {
          fontSize: 11,
          bold: true,
          color: '#ffffff',
          background: '#000000',
          fillColor: '#000000',
          alignment: 'center'
        },
        quote: {
          italics: true
        },
        regular: {
          fontSize: 8
        },
        bold: {
          bold: true
        },
        tableHeader: {
          fontSize: 8,
          bold: true
        },
        fieldValue: {
          fontSize: 8,
          decoration: 'underline',
        },
        underline: {
          decoration: 'underline',
          decorationStyle: 'dashed'
        },
        small: {
          fontSize: 6
        },
        icon: { font: 'Fontello' },
        helpText: {
          fontSize: 12,
          color: '#000000',
          padding: [10, 10, 10, 10],
          fillColor: '#D3D3D3'
        }
      }
    };
    if (sdas.length !== 0) {

     const final =   Observable.combineLatest(sdas.map(sdaId => this.sdaService.exportSda(sdaId)));

    return final.map((result) => result).map((sdaView) => this.getSdaPdf(sdaView)).map((result) => {

          dd.content = [result];
          this.pdf.createPdf(dd).download('mrr.pdf');
     } )

    }

 const sdaList = this.sdaService.searchSda(criteria).switchMap( (result: ISdaListResult, index)  => this.getSdaPdf(result.records))

  return sdaList.map((output) => {
    dd.content = [output];
    this.pdf.createPdf(dd).download('mrr.pdf');
  })
  .catch(e => {
    console.error(e);

    return Observable.of('ERROR');
  })
  .mapTo(null);

  }

  getSdaPdf(sdaList: ISdaListView[]): any {

 const result =  sdaList.reduce( (pdfDefinition: any , sda: ISdaListView, idx ) => {
       pdfDefinition.push(
        idx > 0 ? {
          text: '', pageBreak: 'before'
        } : {},
        {

          table: {

            widths: ['16.66%' , '16.66%', '16.66%', '16.66%', '16.66%', '*' ], heights: 15,
            body: [
              [
                { text: 'MRT #:', alignment: 'center', style: 'tableHeader' },
                { text: 'SDA ID:', alignment: 'center', style: 'tableHeader' },
                { text: 'Status', alignment: 'center', style: 'tableHeader' , fontSize: '8' },
                { text: 'Created By:', alignment: 'center', style: 'tableHeader' },
                { text: 'Created on:', alignment: 'center', style: 'tableHeader' },
                { text: 'Date of Repair:', alignment: 'center', style: 'tableHeader' }
              ],

              [
                { text:  sda.mrtNumber || '', alignment: 'center', style: 'regular' },
                { text:  sda.id || '', alignment: 'center', style: 'regular' },
                { text:  sda.dteRepairStatusDesc || '', alignment: 'center', style: 'regular' },
                { text:  sda.originator || '', alignment: 'center', style: 'regular' },
                { text:  sda.createDate ? moment.utc(sda.createDate).tz(this.CST).format('MM/DD/YYYY') : '', alignment: 'center', style: 'regular' },
                { text:  sda.repairDate ? moment.utc(sda.repairDate).tz(this.CST).format('MM/DD/YYYY') : '', alignment: 'center', style: 'regular' }
              ],
            ]
          }
        },
        this.getAircraftInfo(sda),
        this.getRepairDetails(sda),
        this.getDTESection(sda),
      );

      return pdfDefinition;
    }, [])



    return [result];
  }

  getAircraftInfo(sda: ISdaListView) {
    const generalSection = {
      layout: 'noBorders',
      margin: [0, 3, 0, 0],
      table: {

        style: 'regular',
        widths: ['25%', '25%', '25%', '25%'],
        headerRows: 0,
        body: [
          [{
            text: 'Aircraft Info',
            style: 'sectionHeader',
            colSpan: 4,
            margin: [1, 1, 1, 1]
          }, {}, {}, {}],

          [
            this.getLableFieldValue('Nose #:', sda.aircraftNo, 50, 50),
            this.getLableFieldValue('Fleet:', sda.fleet, 50, 50),
            this.getLableFieldValue('Reg #:', sda.aircraftRegistrationNo, 50, 50),
            this.getLableFieldValue('Serial #:', sda.serialNo )
          ],
          [
            this.getLableFieldValue('Hours:', sda.totalShipTime, 50, 50),
            this.getLableFieldValue('Cycles:', sda.cycles, 50, 50),
          {}, {}
          ],
          [ {colSpan: 4,
            columns: [
            this.getLableFieldValue('Location Of Repair:', sda.repairLocation, 490, 75)
            ]
            }, {}, {}, {}
          ],
          [
            this.getLableFieldValue('Zone:', sda.zone, 50, 50), {}, {}, {}

          ]
        ]
      }

    };


  return generalSection;
  }

  getRepairDetails(sda: ISdaListView) {
    return {
      layout: 'noBorders',
      margin: [0, 3, 0, 0],
      table: {
        fontSize: 6,
        widths: ['33%', '33%', '34%'],
        headerRows: 1,
        body: [
          [{
            text: 'Repair Details',
            style: 'sectionHeader',
            colSpan: 3,
            margin: [1, 1, 1, 1]
          }, {}, {}],
          [
            this.getLableFieldValue(`Station:`, sda.aircraftStation, 50, 60),
            this.getLableFieldValue(`Task Card #:`, sda.taskCardNo, 50, 60),
            this.getLableFieldValue(`Non-Routine:`, sda.nonRoutineNo, 50, 65)
          ],
          [
            this.getLableFieldValue(`Maint Event:`, sda.checkTypeDesc, 50, 60),
            this.getLableFieldValue(`Repair Auth:`, sda.repairDocumentTypeDesc, 50, 60),
            this.getLableFieldValue(`Chap/Fig/Repair:`, sda.chapFigRepairText, 50, 65)
          ],
          [
            this.getLableFieldValue(`EA:`, sda.engineeringAuthorization, 50, 60),
            this.getLableFieldValue(`Damage Type:`, sda.damageType, 50, 60),
            this.getLableFieldValue(`ECO/ESO/MRB #:`, sda.mrbNumber, 50, 65)
          ],
          [
            this.getLableFieldValue(`Description:`, sda.repairDescriptionTypeDesc || sda.defectivePartDescription || sda.modifiedPartDescription || '', 50, 60),
            this.getLableFieldValue(`ATA:`, `${sda.ataCode1}-${sda.ataCode2 % 100}`, 50, 60),
            this.getLableFieldValue(`LAA EA:`, sda.legacyEA, 50, 65),
          ],
          [
            this.getLableFieldValue(`Part Nomenclature:`, sda.partDefective, 50, 60),
            this.getLableFieldValue(`Part Number:`, sda.manufacturerPartNo, 50, 60),
            {}
          ],
          [
            {columns: [
              this.getLableFieldValue(`Width  :`, sda.repairHeight, 30, 30),
              this.getLableFieldValue(` Height:`, sda.repairHeight, 30, 30),
            ]},
            this.getLableFieldValue(`Externally Visible:`, sda.isExternallyVisible ? 'Yes' : 'No' , 50, 60),
            {}
          ]
        ]
      }
    };
  }

  getDTESection(sda: ISdaListView) {
    const content = {
      layout: 'noBorders',
      margin: [0, 5, 0, 0],
      table: {
        fontSize: 6,
        widths: ['33%', '33%', '34%'],
        headerRows: 1,
        body: [
          [{
            text: `Damage Tolerance Evaluation`,
            style: 'sectionHeader',
            colSpan: 3,
            margin: [2, 2, 2, 2]
          }, {}, {}],
          [
            this.getLableFieldValue(`DTE Status:`, sda.dteStatusDesc, 50, 60),
            this.getLableFieldValue(`Repair Insp Status:`, sda.repairInspectionStatusDesc, 50, 60),
            this.getLableFieldValue(`Fatigue Critical:`, sda.isFatigueCritical ? 'Yes' : 'No', 50, 65),
          ],
          [
            this.getLableFieldValue(`Stage 1/RTS Date:`, sda.stage1RTSDate ? moment.utc(sda.stage1RTSDate).tz(this.CST).format('MM/DD/YYYY') : ' ', 50, 60),
            this.getLableFieldValue(`Stage 2 Date:`, sda.stage2Date ? moment.utc(sda.stage2Date).tz(this.CST).format('MM/DD/YYYY') : ' ', 50, 60),
            this.getLableFieldValue(`Stage 3 Date:`, sda.stage3Date ? moment.utc(sda.stage3Date).tz(this.CST).format('MM/DD/YYYY') : ' ', 50, 65),
          ],
          [
            this.getLableFieldValue(`SR #:`, sda.srNumber, 50, 60),
            this.getLableFieldValue(`RDAS #:`, sda.rdasNumber, 50, 60),
            this.getLableFieldValue(`ESM Sub/Item #:`, sda.esmSubItemNumber ? 'Yes' : 'No', 50, 65),
          ],
          [
             this.getDTEThresholdsConent1(sda)
          ],
          [
            this.getDTEMonitorItemsConent1(sda)
          ],
          [ {
            colSpan: 3,
            columns: [
              this.getLableFieldValue('DTE Comments:', sda.dteComments, 511, 60),
            ]
            }
          ],

          [
            this.getMrrUpdated(sda)
          ],
        ]
      }
    };

    return content;
  }

  getDTEThresholdsConent1(sda: ISdaListView) {
    const content = {
      colSpan: 3,
      margin: 0,
      layout: 'noBorders',
      table: {
        style: 'regular',
        widths: ['33%', '33%', '34%'],
          body: [
        ]
      }
    };

    if (sda.dteInspectionThreshold1 || sda.dteInspectionInterval1 || sda.dteInspectionMethod1 ) {
      content.table.body.push([
        this.getLableFieldValue('Threshold1:', sda.dteInspectionThreshold1, 50, 60), this.getLableFieldValue('Repeat Interval1:', sda.dteInspectionInterval1, 50, 60), this.getLableFieldValue('Inspection Method1:', sda.dteInspectionMethod1, 50, 65)])
    }
    if (sda.dteInspectionThreshold2 || sda.dteInspectionInterval2 || sda.dteInspectionMethod2 ) {
      content.table.body.push([
        this.getLableFieldValue('Threshold2:', sda.dteInspectionThreshold2, 50, 60), this.getLableFieldValue('Repeat Interval2:', sda.dteInspectionInterval2, 50, 60), this.getLableFieldValue('Inspection Method2:', sda.dteInspectionMethod2, 50, 60)])
    }

    if (sda.dteInspectionThreshold3 || sda.dteInspectionInterval3 || sda.dteInspectionMethod3 ) {
      content.table.body.push([
        this.getLableFieldValue('Threshold3:', sda.dteInspectionThreshold3, 50, 60), this.getLableFieldValue('Repeat Interval3:', sda.dteInspectionInterval3, 50, 60), this.getLableFieldValue('Inspection Method3:', sda.dteInspectionMethod3, 50, 60)])
    }

    if (sda.dteInspectionThreshold4 || sda.dteInspectionInterval4 || sda.dteInspectionMethod4 ) {
      content.table.body.push([
        this.getLableFieldValue('Threshold4:', sda.dteInspectionThreshold4, 50, 60), this.getLableFieldValue('Repeat Interval4:', sda.dteInspectionInterval4, 50, 60), this.getLableFieldValue('Inspection Method4:', sda.dteInspectionMethod4, 50, 60)])
    }

    if (sda.dteInspectionThreshold5 || sda.dteInspectionInterval5 || sda.dteInspectionMethod5 ) {
      content.table.body.push([
        this.getLableFieldValue('Threshold5:', sda.dteInspectionThreshold5, 50, 60), this.getLableFieldValue('Repeat Interval5:', sda.dteInspectionInterval5, 50, 60), this.getLableFieldValue('Inspection Method5:', sda.dteInspectionMethod5, 50, 60)])
    }

    if (content.table.body.length === 0) {
      content.table.body.push([{}, {}, {}])
    }

    return content;
  }


  getDTEThresholdsConent(sda: ISdaListView) {

    const content = {
      colSpan: 3,
      margin: 0,
      table: {
        style: 'regular',
        widths: ['10%', '30%', '30%', '30%'],
        headerRows: 2,
        body: [
          [
            { text: 'DTE Thresholds', colSpan: 4, style: 'regular', fillColor: '#C0C0C0' }, '', '', ''
          ],
          [
            '', { text: 'Inspection Threshold', style: 'regular' },
            { text: 'Inspection Interval', style: 'regular' },
            { text: 'Inspection Method', style: 'regular' }
          ],
          ['1.', { text: sda.dteInspectionThreshold1 || '', style: 'regular' }, { text: sda.dteInspectionInterval1 || '', style: 'regular' }, { text: sda.dteInspectionMethod1 || '', style: 'regular' }],
          ['2.', { text: sda.dteInspectionThreshold2 || '', style: 'regular' }, { text: sda.dteInspectionInterval2 || '', style: 'regular' }, { text: sda.dteInspectionMethod2 || '', style: 'regular' }],
          ['3.', { text: sda.dteInspectionThreshold3 || '', style: 'regular' }, { text: sda.dteInspectionInterval3 || '', style: 'regular' }, { text: sda.dteInspectionMethod3 || '', style: 'regular' }],
          ['4.', { text: sda.dteInspectionThreshold4 || '', style: 'regular' }, { text: sda.dteInspectionInterval4 || '', style: 'regular' }, { text: sda.dteInspectionMethod4 || '', style: 'regular' }],
          ['5.', { text: sda.dteInspectionThreshold5 || '', style: 'regular' }, { text: sda.dteInspectionInterval5 || '', style: 'regular' }, { text: sda.dteInspectionMethod5 || '', style: 'regular' }],
        ]
      }
    };

    return content;

  }


  getDTEMonitorItemsConent1(sda: ISdaListView) {
    const content = {
      colSpan: 3,
      margin: 0,
      layout: 'noBorders',
      table: {
        style: 'regular',
        widths: ['100%'],
          body: [
        ]
      }
    };

    if (sda.dteMonitorItem1 ) {
      content.table.body.push([
        this.getLableFieldValue('FMR/Logpage/MON1:', sda.dteMonitorItem1, 490, 80)])
    }
    if (sda.dteMonitorItem2 ) {
      content.table.body.push([
        this.getLableFieldValue('FMR/Logpage/MON2:', sda.dteMonitorItem2, 490, 80)])
    }

    if (sda.dteMonitorItem3 ) {
      content.table.body.push([
        this.getLableFieldValue('FMR/Logpage/MON3:', sda.dteMonitorItem3, 490, 80)])
    }

    if (sda.dteMonitorItem4 ) {
      content.table.body.push([
        this.getLableFieldValue('FMR/Logpage/MON4:', sda.dteMonitorItem4, 490, 80)])
    }

    if (sda.dteMonitorItem5 ) {
      content.table.body.push([
        this.getLableFieldValue('FMR/Logpage/MON5:', sda.dteMonitorItem5, 490, 80)])
    }

    if (content.table.body.length === 0) {
      content.table.body.push([{}])
    }

    return content;
  }



  getDTEMonitorItemsConent(sda: ISdaListView) {
    const content = {
      colSpan: 3,
      margin: 0,
      padding: 0,
      table: {
        fontSize: 6,
        widths: ['10%', '90%'],
        headerRows: 2,
        body: [
          [
            { text: 'DTE Monitor Items', colSpan: 2, style: 'regular', fillColor: '#C0C0C0' }, ''
          ],
          [
            '', { text: 'FMR/Logpage/MON', style: 'regular' }
          ],
          ['1.', { text: sda.dteMonitorItem1 || '', style: 'regular' }],
          ['2.', { text: sda.dteMonitorItem2 || '', style: 'regular' }],
          ['3.', { text: sda.dteMonitorItem3 || '', style: 'regular' }],
          ['4.', { text: sda.dteMonitorItem4 || '', style: 'regular' }],
          ['5.', { text: sda.dteMonitorItem5 || '', style: 'regular' }],
        ]
      }
    };

    return content;
  }

  getMrrUpdated(sda: ISdaListView) {
    const content = {
      colSpan: 3,
      margin: 0,
      table: {
        style: 'regular',
        widths: ['33%',  '33%', '34%'],
        body: [
          [
            this.getLableFieldValue(`MRR Update By:`, sda.dteUpdatedBy, 50, 60),
            this.getLableFieldValue(`MRR Update on:`, sda.dteUpdatedDate ? moment.utc(sda.dteUpdatedDate).tz(this.CST).format('MM/DD/YYYY') : ' ', 50, 60),
            this.getLableFieldValue(`DTE Due Date:`, sda.dueDate ? moment.utc(sda.dueDate).tz(this.CST).format('MM/DD/YYYY') : ' ', 50, 60)
          ],
        ]
      }
    };

    return content;

  }
  getLableFieldValue(label: string, val: number | string, maxLength: number = 68, labelLength: number = 0 ) {
    return {
      columns: [
        this.getLabel(label, labelLength),
        {
          stack: [
            { text: val || ' ', style: 'regular' },
          ]
        }
      ]
    };
  }

  getLabel(label: string, width: number = 0) {
    if (width) {
      return { text: label || ' ', style: 'regular', width: width };
    }

    return { text: label || ' ', style: 'regular' };
  }


}