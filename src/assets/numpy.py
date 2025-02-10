import numpy as np
import matplotlib.pyplot as plt

font = {'family' : 'sans',
        'weight' : 'normal',
        'size'   : 16}

plt.rc('font', **font)

#set variables:
KB = 1.380649E-23 #J/K
T = 298 #K
z = 1
Psi0 = 0.150 #V
e0 = 1.602176E-19 #C
Eps0 = 8.854187E-12 #F/m
EpsR = 78 #relative permittivity of water at 20 degrees C
NA = 6.02214076E23 #/mol
C00 = 0.1 #mol/L
C0 = C00*1000 #mol/m^3
Kinv = ((Eps0*EpsR*KB*T)/(e0**2*NA*2*C0))**(1/2)
K = Kinv**(-1)
print(Kinv)

#Reassign kB to work in eV
kB = 8.617E-5 #eV/K

#Define Range
x = np.linspace(0,7E-9,1000)

#Define Exact Function
Psix = (4*kB*T/z)*np.arctanh(np.tanh(z*Psi0/(4*kB*T))*np.exp((-1)*K*x))*1000 #mV
#Define Approximate Function
PsixA = Psi0*np.exp((-1)*K*x)*1000 #mV

#Plot Output
x=x*1E9
fig, ax = plt.subplots()
ax.plot(x,Psix,label='Exact')
#ax.plot(x,PsixA,linestyle='dashed',label='Approximate')
ax.set_xlabel('Distance from Surface (nm)')
ax.set_ylabel('Potential (mV)')
#ax.set_xlim(left=None, right=10)
#ax.invert_yaxis()
#ax.legend(fontsize='14')
ax.text(x[350],0.95*round(Psi0*1000),f'$\Psi$$_0$ = {round(Psi0*1000)} mV', backgroundcolor='white')
ax.text(x[600],0.4*round(Psi0*1000),f'Surface potential in: \n {C0} mmol/L NaCl \n at {T-273} \N{DEGREE SIGN}C in H$_2$O',fontsize='14')
plt.tight_layout()
ax.text(Kinv*1E9+0.2,0.45*round(Psi0*1000),f'1/$\kappa$ = {round(Kinv*1E9,3)} nm')
plt.axvline(x=Kinv*1E9,linestyle='dashed',color='black')
plt.savefig(f'Debye Length 3', transparent=True)
#plt.savefig(f'Plane_Potential_{round(Psi0*1000)}_mV_C_{round(C0)}_mM')
plt.show()