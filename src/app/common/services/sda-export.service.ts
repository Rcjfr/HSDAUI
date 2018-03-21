import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { ILookupData, ISdaListView, IBaseLookUp, Status } from '@app/common/models';
import { Observable } from 'rxjs/Observable';
import { SdaService } from '@app/common/services/sda.service';
import * as constants from '@app/common/constants';
import * as _ from 'lodash';
import * as moment from 'moment-timezone';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
import { AppStateService } from '@app/common/services/app-state.service';
import { AuthService } from '@app/common/services/auth.service';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
//https://github.com/bpampuch/pdfmake/issues/948#issuecomment-293542550
//https://github.com/bpampuch/pdfmake/issues/948
//http://dataurl.net/#dataurlmaker
/*tslint:disable:max-line-length*/
pdfMake.vfs['Fontello.ttf'] = constants.FontelloTTF;

pdfMake.fonts = {
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
}
@Injectable()
export class SdaExportService {
  pdf: any;
  CST = 'America/Chicago';
  isQCPersonnel = false;
  icon_check_empty = '';
  icon_circle_empty = '';
  icon_ok_squared = '';
  icon_dot_circled = '';
  new_line = '\n';
  constructor(private sdaService: SdaService, private authService: AuthService) {
    this.pdf = pdfMake;
    authService.hasAnyRole([authService.HSDA_End_Users,
    authService.Reliability_Analyst,
    authService.CPCP_Trained_Reviewing_Engineer,
    authService.Compliance_Engineer,
    authService.Compliance_Engineering_Analyst,
    authService.Compliance_Engineering_Manager
    ]).take(1).subscribe(u => this.isQCPersonnel = !u);
  }
  exportSda(sdas: number[]): Observable<any> {
    const dd = {
      info: {
        title: 'Structural Defect Alert',
        author: 'American Airlines',
        subject: 'SDA',
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
              widths: ['50%', '50%'],

              body: [
                [
                  {
                    margin: [-600, 0, 0, 0],
                    alignment: 'left',
                    image: constants.AALogo,
                  },
                  //{ text: 'American Airlines', alignment: 'left', style: 'header' },

                  { text: 'Structural Defect Alert', alignment: 'right', style: 'header' }
                ],
                [

                  {
                    colSpan: 2,
                    text: 'For reporting criteria, procedures, and responsibilities, see GPM section detailing Major Repair Reporting',
                    style: 'subheader',
                    alignment: 'center'
                  },

                ]
              ]
            },
            layout: 'noBorders'
          }



        ]



      },
      footer: function (currentPage, pageCount) {
        ///  return  currentPage.toString() + ' of ' + pageCount;
        return {
          margin: 8,
          columns: [
            {
              table: {
                widths: ['15%', '60%', '25%'],

                body: [
                  [
                    { text: `Page ${currentPage} of ${pageCount}`, fontSize: 6, },

                    { fontSize: 6, text: 'Enter form information into WebSceptre and co-mail entire form to 3900 N. Mingo Road / Mail\nDrop 127. In the event of WebSceptre system outage, fax form to Reliability (918) 292-2082 \nor scan and email to reliabilitysdrgroup@aa.com', alignment: 'left' },
                    { fontSize: 6, text: 'ME-0308 (00-0703-3-0107)\nR3 10/15', alignment: 'right' }
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
        fieldValue: {
          fontSize: 8,
          decoration: 'underline',
          //decorationColor: 'blue',
          //decorationStyle: 'dashed'
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
    // sdas = [113234, 112234];
    const final = Observable.combineLatest(sdas.map((sdaId, idx) => this.getSdaPdf(sdaId, idx)));

    return final.do(result => {
      dd.content = [result];
      this.pdf.createPdf(dd).download(sdas.length === 1 ? `${sdas[0]}.pdf` : 'sda.pdf');
    })
      .catch(e => {
        console.error(e);

        return Observable.of('ERROR');
      })
      .mapTo(null);
    //Single
    //  this.getSdaPdf(sdas[0]).subscribe(result => {
    //    dd.content = [result];
    //    this.pdf.createPdf(dd).download(`${sdas[0]}.pdf`);
    //  });
  }

  getSdaPdf(sdaId: number, idx: number): Observable<any> {
    return this.sdaService.exportSda(sdaId).map(sda => {

      const pdfDefinition: Array<any> = [
        idx > 0 ? {
          text: '', pageBreak: 'before'
        } : {},
        {

          table: {
            widths: ['33%', '33%', '*'], heights: 15,
            body: [
              [
                { text: `SDR Number${this.new_line}${sda.sdrNumber || ''}`, alignment: 'center', style: 'regular' },
                { text: `ATA Code${this.new_line}${sda.ataCode1}-${sda.ataCode1Desc} ${sda.ataCode2 % 100}-${sda.ataCode2Desc}`, alignment: 'center', style: 'regular' },
                { text: `Alert Code${this.new_line}${sda.alertCodeDesc}`, alignment: 'center', style: 'regular' }
              ],
            ]
          }
        },
        this.getGeneralSection(sda),
        this.getDefectLocationSection(sda),
        this.getCPCPSection(sda),
        this.getCorrectiveActionSection(sda),
      ];
      if (!this.isQCPersonnel) {
        pdfDefinition.push(this.getCPCPDispositionSection(sda));
        pdfDefinition.push(this.getRepairDetailsSection(sda));
        pdfDefinition.push(this.getDTESection(sda));
      }

      return pdfDefinition;
    })
  }

  getGeneralSection(sda: ISdaListView) {
    return {
      layout: 'noBorders',
      margin: [0, 3, 0, 0],
      table: {

        style: 'regular',
        widths: ['20%', '30%', '25%', '25%'],
        headerRows: 0,
        body: [
          [
            this.getLabel('SDA ID:'),
            this.getFieldValue(sda.id),
            this.getLabel('Line Maintenance:'),
            { text: sda.lineMaintenance ? this.icon_ok_squared : this.icon_check_empty, style: 'icon', alignment: 'center' },
          ],
          [
            this.getLabel('Create Date:'),
            this.getFieldValue(moment(sda.createDate).format('MM/DD/YYYY')),
            this.getLabel('Station:'),
            this.getFieldValue(sda.station, 133),
          ],
          [
            this.getLabel('Department:'),
            this.getFieldValue(sda.departmentDesc),
            {
              text: [
                { text: 'Defect Discovered during:', style: 'regular' }
              ], colSpan: 2
            }
          ],
          [
            this.getLableFieldValue('Aircraft Nose #:', sda.aircraftNo, 50, 60),
            this.getLableFieldValue('Fleet:', sda.fleet, 130, 30),
            {
              text: [
                { text: sda.defectDiscoveredDuring === 'U' ? this.icon_dot_circled : this.icon_circle_empty, style: 'icon' },
                { text: ' Unscheduled Maintenance', style: 'regular' },
              ], colSpan: 2
            }, {}
          ],
          [
            this.getLabel('AC Manufacturer:'),
            this.getFieldValue(sda.manufacturer),
            this.getLabel('Description:'),
            this.getFieldValue(sda.unscheduledMaintenanceDescription, 133)
          ],
          [
            this.getLabel('AC Model/Series:'),
            this.getFieldValue(sda.model),
            this.getLableFieldValue('Non-Routine #: ', sda.defectDiscoveredDuring === 'U' ? sda.nonRoutineNo || ' ' : ' ', 60, 63),
            this.getLableFieldValue('MIC #: ', sda.micNo, 103, 30),
          ],
          [
            this.getLabel('Serial #:'),
            this.getFieldValue(sda.serialNo),
            {
              text: [
                { text: sda.defectDiscoveredDuring === 'S' ? this.icon_dot_circled : this.icon_circle_empty, style: 'icon' },
                { text: ' Scheduled Maintenance', style: 'regular' },
              ], colSpan: 2
            }, {}
          ],
          [
            this.getLableFieldValue('Total Ship Time:', sda.totalShipTime, 48, 62),
            this.getLableFieldValue('Cycles:', sda.cycles, 125, 35),
            this.getLableFieldValue('Check Type:', sda.checkTypeDesc, 78, 55),
            this.getLableFieldValue('ESM Reference #:', sda.esmReference, 68, 65)
          ],
          [
            this.getLabel('Originator:'),
            this.getFieldValue(`${sda.originatorBadgeNo} - ${sda.originator}`),
            { text: 'Generated By Document:', style: 'regular', colSpan: 2 }, {}
          ],
          [
            {}, {},
            this.getLableFieldValue(`Routine #:`, sda.routineNo, 83, 50),
            this.getLableFieldValue(`Non-Routine #:`, sda.defectDiscoveredDuring === 'S' ? sda.nonRoutineNo || ' ' : ' ', 78, 55),
          ]
        ]
      }

    };
  }

  getDefectLocationSection(sda: ISdaListView) {
    return {
      layout: 'noBorders',
      margin: [0, 3, 0, 0],
      table: {
        fontSize: 6,
        widths: ['20%', '30%', '20%', '30%'],
        headerRows: 1,
        body: [
          [{
            text: 'Description and Location of Defects or Damage',
            style: 'sectionHeader',
            colSpan: 4,
            margin: [1, 1, 1, 1]
          }, {}, {}, {}],
          [
            this.getLabel('Damage Type:'),
            this.getFieldValue(sda.damageTypeDesc),
            {
              //alignment: 'justify',
              colSpan: 2,
              columns: [
                this.getLabel('Defect Size:(in inches)', 100),
                this.getLabel('Length: '),
                this.getFieldValue(sda.length.toFixed(2), 30),
                this.getLabel('Width: '),
                this.getFieldValue(sda.width.toFixed(2), 30),
                this.getLabel('Depth: '),
                this.getFieldValue(sda.depth.toFixed(2), 30)
              ]
              , style: 'regular'
            }
          ],
          [
            this.getLabel('Damage Description:'),
            { ...this.getFieldValue(sda.damageDescription, 453), colSpan: 3 },
            {}, {}],
          [
            {
              text: ['Precise Location of Defect:', { text: '(Enter From/To if Applicable)' }],
              colSpan: 4, style: ['regular', 'bold'], fontSize: 10
            }, '', '', ''
          ],
          [
            this.getLableFieldValue(`Aircraft Station: `, sda.aircraftStation, 50, 60),
            this.getLableFieldValue(`Stringer: `, sda.stringer, 125, 35),
            this.getLableFieldValue(`WL: `, sda.waterLine, 95, 20),
            this.getLableFieldValue(`BL: `, sda.buttLine, 135, 25),
          ],
          [
            this.getLabel('MFG Part #:'),
            this.getFieldValue(sda.manufacturerPartNo),
            this.getLabel('Part Defective:'),
            this.getFieldValue(sda.partDefective)
          ],
          [
            this.getLableFieldValue('MFG Serial #:', sda.manufacturerSerialNo, 60, 50),
            this.getLableFieldValue('Part TT:', sda.partTT, 130, 30),
            this.getLableFieldValue('Part TSO:', sda.partTSO, 73, 40),
            this.getLableFieldValue('How Detected:', `${sda.detectionMethodDesc || ''}${sda.detectionMethodDesc === 'Other' ? '(' + sda.detectionMethodOtherDescription + ')' : ''}`, 90, 70),
          ]
        ]
      }
    };
  }

  getCPCPSection(sda: ISdaListView) {

    return {
      layout: 'noBorders',
      margin: [0, 3, 0, 0],
      table: {
        fontSize: 6,
        widths: ['20%', '30%', '20%', '30%'],
        headerRows: 1,
        body: [
          [{
            text: 'Corrosion Prevention Control Program',
            style: 'sectionHeader',
            colSpan: 4,
            margin: [1, 1, 1, 1]
          }, {}, {}, {}],
          //[
          //  { text: 'Is this a CPCP related event?' },
          //  {
          //    text: this.getBooleanContent(sda.isCPCPRelatedEvent), colSpan: 3
          //  },
          //  '', ''
          //],
          [
            this.getLabel('Widespread Corrosion?'),
            {
              text: this.getBooleanContent(sda.isWideSpreadCorrosion), style: 'regular'
            },
            this.getLabel('Corrosion Level:'),
            {
              text: [
                { text: sda.corrosionLevel === 1 ? this.icon_dot_circled : this.icon_circle_empty, style: 'icon' },
                { text: ' 1   ' },
                ' ',
                { text: sda.corrosionLevel === 2 ? this.icon_dot_circled : this.icon_circle_empty, style: 'icon' },
                { text: ' 2   ' },
                ' ',
                { text: sda.corrosionLevel === 3 ? this.icon_dot_circled : this.icon_circle_empty, style: 'icon' },
                { text: ' 3   ' },
                ' ',
              ], style: 'regular'
            },
          ],
          [
            this.getLabel('Corroded Area Previously Blended?'),
            {
              text: this.getBooleanContent(sda.isPreviouslyBlended), style: 'regular'
            },
            this.getLabel('Corrosion Task #:'),
            this.getFieldValue(sda.corrosionTaskNo)
          ],
          [
            this.getLabel('Type of Corrosion:'),
            this.getFieldValue(`${sda.corrosionTypeDesc || ''}${sda.corrosionTypeDesc === 'Other' ? '(' + sda.corrosionTypeOtherText + ')' : ''}`),
            this.getLabel('Floorboard condition after mat is removed:'),
            this.getFieldValue(sda.floorBoardConditionDesc)
          ],
          [
            {
              layout: 'noBorders',
              table: {
                headerRows: 1,
                margin: [0, 0, 0, 0],
                widths: ['33%', '33%', '34%'],
                body: [
                  [
                    { text: 'Cause of Damage:', colSpan: 3, style: ['regular', 'bold'], fontSize: 10 }, '', ''
                  ],
                  [
                    {
                      text: this.getCauseOfDamageContent(1, 'Environment', sda.causesOfDamage), style: 'regular'
                    },
                    {
                      text: this.getCauseOfDamageContent(2, 'Lav/Galley Spill', sda.causesOfDamage), style: 'regular'
                    },
                    {
                      text: this.getCauseOfDamageContent(4, 'Blocked Drain', sda.causesOfDamage), style: 'regular'
                    }
                  ],
                  [
                    {
                      text: this.getCauseOfDamageContent(8, 'Chemical Spill', sda.causesOfDamage), style: 'regular'
                    },
                    {
                      text: this.getCauseOfDamageContent(16, 'Wet Insulation Blanket', sda.causesOfDamage), style: 'regular'
                    },
                    {
                      text: this.getCauseOfDamageContent(32, 'Missing/Deteriorated Floorboard Tape', sda.causesOfDamage), style: 'regular'
                    }
                  ],
                  [
                    {
                      text: this.getCauseOfDamageContent(64, 'Correct Harware Not Installed', sda.causesOfDamage), style: 'regular'
                    },
                    {
                      text: this.getCauseOfDamageContent(128, 'Deteriorated/Poor Sealing Practices', sda.causesOfDamage), style: 'regular'
                    },
                    {
                      text: this.getCauseOfDamageContent(256, 'Missing Corrosion Inhibitor', sda.causesOfDamage), style: 'regular'
                    }
                  ],
                  //[
                  //  {
                  //    text: this.getCauseOfDamageContent(512, 'Other', sda.causesOfDamage), style: 'regular'
                  //  },
                  // { ...this.getFieldValue(sda.causeOfDamageOtherText, 300), colSpan: 2 },
                  //  , {}
                  //],
                  [
                    {
                      colSpan: 3,
                      style: 'regular',
                      columns: [
                        //...this.getCauseOfDamageContent(512, 'Other', sda.causesOfDamage),
                        // tslint:disable-next-line:no-bitwise
                        { text: ((sda.causesOfDamage & 512) === 512) ? this.icon_ok_squared : this.icon_check_empty, style: 'icon', width: 9 }, { text: ` Other`, style: 'regular', width: 30 },
                        {
                          stack: [
                            this.getLabel(sda.causeOfDamageOtherText),
                            this.getLine(530)
                          ]
                        }
                      ]
                    }, {}, {}
                  ]
                ]
              }, colSpan: 4
            }, '', '', ''
          ],

        ]
      }
    };
  }

  getCorrectiveActionSection(sda: ISdaListView) {
    const content: any = {
      layout: 'noBorders',
      margin: [0, 3, 0, 0],
      table: {
        fontSize: 6,
        widths: ['25%', '15%', '35%', '25%'],
        headerRows: 1,
        body: [
          [{
            text: 'Corrective Actions',
            style: 'sectionHeader',
            colSpan: 4,
            margin: [1, 1, 1, 1]
          }, {}, {}, {}
          ],
          [
            this.getLabel('Deferred?'),
            {
              text: this.getBooleanContent(sda.isDeferred),
              style: 'regular'
            },
            this.getLableFieldValue('SCEPTRE Deferral Code:', sda.deferralCode),
            this.getLableFieldValue('Deferral #:', sda.deferralNo, 65)
          ],
          [
            {
              colSpan: 4,
              style: 'regular',
              columns: [
                { text: sda.repairType === 1 ? this.icon_dot_circled : this.icon_circle_empty, style: 'icon', width: 10 },
                { text: ' Defective Part Replaced With Identical Part #', width: 175 },
                {
                  stack: [
                    this.getLabel(sda.defectivePartDescription),
                    this.getLine(385)
                  ]
                }
              ]
            }, {}, {}
          ],
          [
            {
              colSpan: 4,
              style: 'regular',
              columns: [
                { text: sda.repairType === 2 ? this.icon_dot_circled : this.icon_circle_empty, style: 'icon', width: 10 },
                { text: 'Modified Part # Installed', width: 175 },
                {
                  stack: [
                    this.getLabel(sda.modifiedPartDescription),
                    this.getLine(385)
                  ]
                }
              ]
            }, {}, {}
          ],
          [
            {
              colSpan: 4,
              style: 'regular',
              columns: [
                { text: sda.repairType === 3 ? this.icon_dot_circled : this.icon_circle_empty, style: 'icon', width: 10 },
                { text: 'Repaired (Describe)', width: 175 },
              ]
            }, {}, {}
          ]
        ]
      }
    };
    //if (sda.repairType === 3) {
    content.table.body.push([
      this.getLabel('Description:'),
      { ...this.getFieldValue(sda.repairDescriptionTypeDesc, 350), colSpan: 3 },
      {}, {}
    ]);

    content.table.body.push([
      this.getLabel('Engineering Authorization (EA):'),
      { ...this.getFieldValue(sda.engineeringAuthorization), colSpan: 2 }, {},
      {
        text: [
          this.getLabel('Externally Visible?'), ' ',
          {
            text: this.getBooleanContent(sda.isExternallyVisible), style: 'regular'
          }], style: 'regular'
      }
    ]);
    content.table.body.push([
      { ...this.getLabel('Approximate External Doubler Repair Dimensions'), colSpan: 2 },
      {},
      this.getLableFieldValue('Height(in inches):', sda.repairHeight ? sda.repairHeight.toFixed(2) : ' '),
      this.getLableFieldValue('Width(in inches):', sda.repairWidth ? sda.repairWidth.toFixed(2) : ' ', 60)
    ]);

    //}
    content.table.body.push([
      this.getLabel('Major Repair?'),
      {
        text: this.getBooleanContent(sda.isMajorRepair),
        style: 'regular'
      },
      { ...this.getFieldValue(sda.majorRepairDescription, 330), colSpan: 2 }
      , ''
    ]);

    content.table.body.push([
      this.getLabel('Repair Document:'),
      this.getFieldValue(sda.repairDocumentTypeDesc, 75),
      { ...this.getLableFieldValue('Chap/Fig/Repair:', sda.chapFigRepairText, 260, 70), colSpan: 2 },
      {}
      //this.getLabel('Chap/Fig/Repair:'),
      //this.getFieldValue(sda.chapFigRepairText, 130)
    ]);
    content.table.body.push([{}, {}, {}, {}]);
    content.table.body.push([
      { text: [{ text: sda.completedBy || '' }, this.new_line, { text: _.padEnd('QC Inspector Stamp or Signature and Employee Number', 70), decoration: 'overline', bold: true }], colSpan: 3, style: 'regular' }, {}, {},
      { text: [{ text: sda.completedOn ? moment.utc(sda.completedOn).tz(this.CST).format('MM/DD/YYYY') : '' }, this.new_line, { text: _.padEnd('Date', 62), decoration: 'overline', bold: true }], colSpan: 1, style: 'regular' }
    ]);

    return content;
  }

  getCPCPDispositionSection(sda: ISdaListView) {
    const content = {
      layout: 'noBorders',
      pageBreak: 'before',
      table: {
        fontSize: 6,
        widths: ['20%', '30%', '20%', '30%'],
        headerRows: 1,
        body: [
          [{
            text: `CPCP Disposition for SDA ID #: ${sda.id}`,
            style: 'sectionHeader',
            colSpan: 4,
            margin: [2, 2, 2, 2]
          }, {}, {}, {}],
          [
            {
              text: [
                { text: sda.isNonCPCPRelatedEvent === true ? this.icon_ok_squared : this.icon_check_empty, style: 'icon' },
                ' ',
                { text: 'Non-CPCP' },
              ], colSpan: 4, style: 'regular'
            }, '', '', ''
          ],
          [
            this.getLabel('Is CPCP Task # correct?'),

            {
              text: this.getBooleanContent(sda.isCorrosionTaskNoCorrect), style: 'regular'
            },
            this.getLabel('Corrected CPCP Task #:'),
            this.getFieldValue(sda.correctedCorrosionTaskNo, 135)
          ],
          [
            this.getLabel('Is Corrosion Level correct?'),
            {
              text: this.getBooleanContent(sda.isCorrosionLevelCorrect), style: 'regular'
            },
            {
              text: ['Corrected Corrosion Level:', this.new_line,
                {
                  text: [
                    { text: sda.correctedCorrosionLevel === 1 ? this.icon_dot_circled : this.icon_circle_empty, style: 'icon' },
                    { text: ' 1' },
                    ' ',
                    { text: sda.correctedCorrosionLevel === 2 ? this.icon_dot_circled : this.icon_circle_empty, style: 'icon' },
                    { text: ' 2' },
                    ' ',
                    { text: sda.correctedCorrosionLevel === 3 ? this.icon_dot_circled : this.icon_circle_empty, style: 'icon' },
                    { text: ' 3' },
                    ' ',
                  ]
                }, this.new_line,
                {
                  //color: '#ff0000',
                  style: 'helpText',
                  text: 'See GPM 09.09 for corrosion level determinations'
                }

              ],
              rowSpan: 1, style: 'regular'
            }
            ,
            {
              text: [
                'Reason for level change:', this.new_line,
                { text: sda.corrosionLevelChangeReason === 1 ? this.icon_dot_circled : this.icon_circle_empty, style: 'icon' },
                { text: ' Incorrect per Corrosion Level Block Diagram' }, this.new_line,
                { text: sda.corrosionLevelChangeReason === 2 ? this.icon_dot_circled : this.icon_circle_empty, style: 'icon' },
                { text: ' Evidence of a previous blend has been determined' }, this.new_line,
                { text: sda.corrosionLevelChangeReason === 3 ? this.icon_dot_circled : this.icon_circle_empty, style: 'icon' },
                { text: ' New limits have been defined' }, this.new_line,
                { text: sda.corrosionLevelChangeReason === 4 ? this.icon_dot_circled : this.icon_circle_empty, style: 'icon' },
                { text: ' Pre-blended measurements indicate Level - 1; elected to replace part for company convenience' }, this.new_line,
                { text: sda.corrosionLevelChangeReason === 5 ? this.icon_dot_circled : this.icon_circle_empty, style: 'icon' },
                { text: ' Other' }, sda.corrosionLevelChangeReasonOtherText ? `(${sda.corrosionLevelChangeReasonOtherText})` : '', this.new_line,
              ], rowSpan: 1, style: 'regular'
            }
          ],
          [
            this.getLabel('Widespread Corrosion?'),
            {
              text: this.getBooleanContent(sda.isCPCPDWideSpreadCorrosion), colSpan: 3, style: 'regular'
            }, '', ''
          ],
          [
            this.getLabel('Engineering Comments'),
            { ...this.getFieldValue(sda.engineeringComments, 430), colSpan: 3 },
            {}, {}
          ],
          [
            this.getLabel('QC Feedback'),
            { ...this.getFieldValue(sda.qcFeedback, 430), colSpan: 3 },
            {}, {}
          ],
          [
            {
              colSpan: 4,
              style: 'regular',
              text: [
                { text: sda.submittedToQC ? this.icon_ok_squared : this.icon_check_empty, style: 'icon' }, ' Submitted to QC'
              ]
            }, '', '', ''
          ],
          [
            {
              text: [
                { text: sda.isReviewComplete === true ? this.icon_ok_squared : this.icon_check_empty, style: 'icon' }, ' Review Complete'
              ], style: 'regular'
            },
            { ...this.getFieldValue(sda.reviewerBadgeNo ? `${sda.reviewerBadgeNo} - ${sda.reviewer}` : ' ', 430), colSpan: 3 },
            '', ''
          ]
        ]
      }
    };

    return content;
  }

  getRepairDetailsSection(sda: ISdaListView) {
    const content = {
      layout: 'noBorders',
      pageBreak: 'before',
      table: {
        fontSize: 6,
        widths: ['20%', '30%', '20%', '30%'],
        headerRows: 1,
        body: [
          [{
            text: `Repair Details for SDA ID #: ${sda.id}`,
            style: 'sectionHeader',
            colSpan: 4,
            margin: [2, 2, 2, 2]
          }, {}, {}, {}],
          [
            this.getLabel('Engineering Authorization (EA):'),
            this.getFieldValue(sda.engineeringAuthorization),
            this.getLabel('Routine Task Card #:'),
            this.getFieldValue(sda.routineNo)
          ],
          [
            this.getLabel('Non-Routine #:'),
            this.getFieldValue(sda.nonRoutineNo),
            this.getLabel('Externally Visible?'),
            { text: this.getBooleanContent(sda.isExternallyVisible), style: 'regular' }
          ],
          [
            this.getLabel('Repair Document:'),
            this.getFieldValue(sda.repairDocumentTypeDesc),
            this.getLabel('Chap/Fig/Repair:'),
            this.getFieldValue(sda.chapFigRepairText)
          ],
          [
            this.getLabel('Repair Description:'),
            this.getFieldValue(sda.repairDescriptionTypeDesc),
            this.getLabel('Part Nomenclature:'),
            this.getFieldValue(sda.partDefective)
          ],
          [
            this.getLabel('Part Number:'),
            this.getFieldValue(sda.manufacturerPartNo),
            this.getLabel('Part Serial Number:'),
            this.getFieldValue(sda.manufacturerSerialNo)
          ],
          [
            this.getLabel('Height(in inches):'),
            this.getFieldValue(sda.repairHeight ? sda.repairHeight.toFixed(2) : ' '),
            this.getLabel('Width(in inches):'),
            this.getFieldValue(sda.repairWidth ? sda.repairWidth.toFixed(2) : ' ')
          ],

        ]
      }
    };

    return content;
  }

  getDTESection(sda: ISdaListView) {
    const content = {
      layout: 'noBorders',
      margin: [0, 5, 0, 0],
      table: {
        fontSize: 6,
        widths: ['20%', '30%', '20%', '30%'],
        headerRows: 1,
        body: [
          [{
            text: `Damage Tolerance Evaluation for SDA ID #: ${sda.id}`,
            style: 'sectionHeader',
            colSpan: 4,
            margin: [2, 2, 2, 2]
          }, {}, {}, {}],
          [
            this.getLabel('DTE Status:'),
            this.getFieldValue(sda.dteStatusDesc)
            , '', ''
          ],
          [
            this.getLabel('Total Ship Time:'),
            this.getFieldValue(sda.dteTotalShipTime)
            , '', ''
          ],
          [
            this.getLabel('Cycles:'),
            this.getFieldValue(sda.dteCycles)

            , '', ''
          ],
          [
            this.getLabel('Repair Insp. Status:'),
            this.getFieldValue(sda.repairInspectionStatusDesc)
            , '', ''
          ],
          [
            this.getLabel('Fatigue Critical?'),
            {
              text: this.getBooleanContent(sda.isFatigueCritical), style: 'regular'
            }, {}, {}
          ],
          [
            this.getLabel('Stage 1/RTS Date:'),
            this.getFieldValue(sda.stage1RTSDate ? moment.utc(sda.stage1RTSDate).tz(this.CST).format('MM/DD/YYYY') : ' ')
            , {}, {}
          ],
          [
            {
              text: [
                { text: sda.stage1Duration === 6 ? this.icon_dot_circled : this.icon_circle_empty, style: 'icon' },
                { text: ' 6 Months' }], style: 'regular'
            },
            {
              text: [
                { text: sda.stage1Duration === 12 ? this.icon_dot_circled : this.icon_circle_empty, style: 'icon' },
                { text: ' 12 Months' }], style: 'regular'
            },
            {
              text: [
                { text: sda.stage1Duration === 18 ? this.icon_dot_circled : this.icon_circle_empty, style: 'icon' },
                { text: ' 18 Months' }], style: 'regular'
            },
            {
              text: [
                { text: sda.stage1Duration === 24 ? this.icon_dot_circled : this.icon_circle_empty, style: 'icon' },
                { text: ' 24 Months' }], style: 'regular'
            }
          ],
          [
            this.getLabel('Stage 2 Approval Date:'),
            this.getFieldValue(sda.stage2Date ? moment.utc(sda.stage2Date).tz(this.CST).format('MM/DD/YYYY') : ' '),
            this.getLabel('Stage 3 Approval Date:'),
            this.getFieldValue(sda.stage3Date ? moment.utc(sda.stage3Date).tz(this.CST).format('MM/DD/YYYY') : ' ')

          ],
          [
            this.getLabel('SR #:'),
            this.getFieldValue(sda.srNumber),
            this.getLabel('RDAS #:'),
            this.getFieldValue(sda.rdasNumber)
          ],
          [
            this.getLabel('ETD #:'),
            this.getFieldValue(sda.etdNumber),
            this.getLabel('ESM Sub/Item #:'),
            this.getFieldValue(sda.esmSubItemNumber)
          ],
          [
            this.getDTEThresholdsConent(sda)
          ],
          [
            this.getDTEMonitorItemsConent(sda)
          ],
          [
            this.getLabel('DTE Comments:'),
            { ...this.getFieldValue(sda.dteComments, 400), colSpan: 3 },
            {}, {}
          ],
          [
            this.getLabel('QC Feedback:'),
            { ...this.getFieldValue(sda.dteqcFeedback, 400), colSpan: 3 },
            {}, {}
          ],
          [
            {
              colSpan: 4,
              style: 'regular',
              text: [
                { text: sda.dteSubmittedToQC ? this.icon_ok_squared : this.icon_check_empty, style: 'icon' }, ' Submitted to QC'
              ]
            }, '', '', ''
          ],
          [
            {
              colSpan: 4,
              layout: 'noBorders',
              table: {
                headerRows: 0,
                margin: [0, 0, 0, 0],
                widths: ['16%', '17%', '16%', '17%', '16%', '18%'],
                body: [
                  [
                    this.getLabel('Major Repair Updated By:'),
                    this.getFieldValue(sda.dteUpdatedBy, 75),
                    this.getLabel('Major Repair Updated Date:'),
                    this.getFieldValue(sda.dteUpdatedDate ? moment.utc(sda.dteUpdatedDate).tz(this.CST).format('MM/DD/YYYY hh:mm A') : ' ', 75),
                    this.getLabel('DTE Due Date:'),
                    this.getFieldValue(sda.dueDate, 75),
                  ]
                ]
              }
            }, '', '', ''
          ]
        ]
      }
    };

    return content;
  }

  getDTEThresholdsConent(sda: ISdaListView) {
    const content = {
      colSpan: 4,
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
          ['1.', { text: sda.dteInspectionThreshold1 || '', style: 'fieldValue' }, { text: sda.dteInspectionInterval1 || '', style: 'fieldValue' }, { text: sda.dteInspectionMethod1 || '', style: 'fieldValue' }],
          ['2.', { text: sda.dteInspectionThreshold2 || '', style: 'fieldValue' }, { text: sda.dteInspectionInterval2 || '', style: 'fieldValue' }, { text: sda.dteInspectionMethod2 || '', style: 'fieldValue' }],
          ['3.', { text: sda.dteInspectionThreshold3 || '', style: 'fieldValue' }, { text: sda.dteInspectionInterval3 || '', style: 'fieldValue' }, { text: sda.dteInspectionMethod3 || '', style: 'fieldValue' }],
          ['4.', { text: sda.dteInspectionThreshold4 || '', style: 'fieldValue' }, { text: sda.dteInspectionInterval4 || '', style: 'fieldValue' }, { text: sda.dteInspectionMethod4 || '', style: 'fieldValue' }],
          ['5.', { text: sda.dteInspectionThreshold5 || '', style: 'fieldValue' }, { text: sda.dteInspectionInterval5 || '', style: 'fieldValue' }, { text: sda.dteInspectionMethod5 || '', style: 'fieldValue' }],
        ]
      }
    };

    return content;

  }

  getDTEMonitorItemsConent(sda: ISdaListView) {
    const content = {
      colSpan: 4,
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
          ['1.', { text: sda.dteMonitorItem1 || '', style: 'fieldValue' }],
          ['2.', { text: sda.dteMonitorItem2 || '', style: 'fieldValue' }],
          ['3.', { text: sda.dteMonitorItem3 || '', style: 'fieldValue' }],
          ['4.', { text: sda.dteMonitorItem4 || '', style: 'fieldValue' }],
          ['5.', { text: sda.dteMonitorItem5 || '', style: 'fieldValue' }],
        ]
      }
    };

    return content;
  }

  getCauseOfDamageContent(val: number, text: string, currentVal: number): Array<any> {
    const content = [
      // tslint:disable-next-line:no-bitwise
      { text: ((currentVal & val) === val) ? this.icon_ok_squared : this.icon_check_empty, style: 'icon' }, { text: ` ${text}`, style: 'regular' },
    ]

    return content;
  }

  getBooleanContent(val: boolean) {
    return [
      { text: val === true ? this.icon_dot_circled : this.icon_circle_empty, style: 'icon' },
      { text: ' Yes' },
      ' ',
      { text: val === false ? this.icon_dot_circled : this.icon_circle_empty, style: 'icon' },
      { text: ' No' }
    ]
  }

  padContent(val: number | string, maxLength: number = 50): any {
    //return _.padEnd(val.toString(),maxLength);
    //return [
    //  { text: val, style: 'fieldValue' },this.new_line,
    //  {text:_.padEnd(' ',maxLength),decoration:'underline'}
    //]
    return [
      { text: val || ' ', style: 'fieldValue', width: maxLength }

    ]
  }

  getLableFieldValue(label: string, val: number | string, maxLength: number = 68, labelLength: number = 0, ) {
    return {
      columns: [
        this.getLabel(label, labelLength),
        {
          stack: [
            { text: val || ' ', style: 'regular' },
            this.getLine(maxLength)
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

  getLine(maxLength: number) {
    return { canvas: [{ type: 'line', x1: 0, y1: 3, x2: maxLength, y2: 3, lineWidth: 0.5 }] }
  }

  getFieldValue(val: number | string, maxLength: number = 160) {
    return {
      columns: [
        {
          stack: [
            { text: val || ' ', style: 'regular' },
            this.getLine(maxLength)
          ]
        }
      ]
    }
  }
}
